/**
 * @file brixel-wasm.js — 브라우저 안에서 avr-gcc 로 Arduino 스케치를 컴파일하는 클라이언트.
 * @description
 *   container2wasm 으로 만든 Linux VM(QEMU/emscripten) 안의 컴파일 서비스
 *   (compile-service.py + brixel-compile.py) 와 통신한다.
 *   - 코드 주입: xterm.paste → PTY stdin (BRIXEL_BOARD/base64/BRIXEL_GO 프로토콜)
 *   - HEX 회수: master.onWrite 로 stdout 캡처 → HEX_START..HEX_END 파싱
 *
 *   PC 에이전트가 없는 크롬북/데스크톱 크롬에서 "무설치·무서버" 컴파일에 사용.
 *   업로드는 WebSerialAvrUploader(Web Serial) 가 담당한다.
 *
 *   ⚠ 동작 요건: cross-origin isolation (COOP/COEP 헤더) — SharedArrayBuffer/pthreads.
 *      GitHub Pages 에선 coi-serviceworker.js 로 헤더를 주입해야 한다.
 *
 * 사용:
 *   import { BrixelWasmCompiler } from './js/brixel-wasm.js';
 *   const c = new BrixelWasmCompiler({ assetBase: 'https://.../wasm/', onLog: console.log });
 *   await c.init();                      // VM 다운로드(~460MB) + 부팅 (1회성)
 *   const r = await c.compile(code, 'uno');  // { ok, hex, flashBytes, flashPct, compileMs }
 */

const XTERM_URL    = 'https://unpkg.com/xterm@5.3.0/lib/xterm.js';
const XTERMPTY_URL = 'https://unpkg.com/xterm-pty/index.js';

export class BrixelWasmCompiler {
  /**
   * @param {object} opts
   * @param {string} opts.assetBase  WASM 자산(load.js/out.js/qemu*.{wasm,data}/dist/vendor) 의 기준 URL (끝에 / 포함)
   * @param {(msg:string)=>void} [opts.onLog]      로그 콜백
   * @param {(p:number,msg?:string)=>void} [opts.onProgress]  0~100 진행률 (다운로드/부팅)
   * @param {HTMLElement|null} [opts.terminalEl]   xterm 표시용 요소(없으면 화면 밖 hidden)
   */
  constructor({ assetBase = './wasm/', dataUrl = null, onLog = () => {}, onProgress = () => {}, terminalEl = null } = {}) {
    // 절대 URL 로 정규화: dynamic import() 는 "모듈(/js/) 기준", <script src> 은 "문서(/) 기준"
    // 으로 상대경로를 다르게 해석하므로, 절대 URL 로 통일해야 둘 다 올바르게 동작한다.
    const withSlash = assetBase.endsWith('/') ? assetBase : assetBase + '/';
    this.assetBase = (typeof document !== 'undefined')
      ? new URL(withSlash, document.baseURI).href
      : withSlash;
    // 대용량 rootfs(qemu-system-x86_64.data, ~464MB)만 별도 URL(GitHub Release 등)에서 받기.
    // 작은 파일(out.js/load.js/arg-module.js/qemu.wasm)은 same-origin(assetBase)에 두면
    // cross-origin ES 모듈 import(CORS) 문제를 피한다.
    this.dataUrl = dataUrl;
    this.onLog = onLog;
    this.onProgress = onProgress;
    this.terminalEl = terminalEl;
    this._ready = null;
    this._booted = false;
    this._busy = false;
    this._captureBuf = '';
    this._waiters = new Set();
    this._xterm = null;
    this._master = null;
    this._slave = null;
  }

  /** 라이브러리 스크립트(load.js, arg-module.js)를 classic script 로 주입하고 로드 완료를 기다린다. */
  _injectScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('script load failed: ' + src));
      document.head.appendChild(s);
    });
  }

  /**
   * URL 을 ArrayBuffer 로 가져오되 Cache API 로 영구 캐싱한다.
   * 캐시 히트면 다운로드 생략(다음 방문부터 403MB 안 받음). 미스면 받으며 진행률 콜백.
   * @param {string} url
   * @param {(pct:number,recv:number,total:number)=>void} [onProg]
   */
  async _fetchCached(url, onProg) {
    const CACHE = 'brixel-wasm-v1';
    let cache = null;
    try { cache = await caches.open(CACHE); } catch (e) { /* private mode 등 */ }
    if (cache) {
      try {
        const hit = await cache.match(url);
        if (hit) { this.onLog('💾 캐시 사용 (다운로드 생략): ' + url.split('/').pop()); return await hit.arrayBuffer(); }
      } catch (e) {}
    }
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('fetch 실패 ' + resp.status + ': ' + url);
    const total = +resp.headers.get('content-length') || 0;
    let buf;
    if (resp.body && total && onProg) {
      const u8 = new Uint8Array(total);
      const reader = resp.body.getReader();
      let recv = 0, last = -1;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        u8.set(value, recv);
        recv += value.length;
        const pct = Math.round((recv / total) * 100);
        if (pct !== last) { last = pct; onProg(pct, recv, total); }
      }
      buf = u8.buffer;
    } else {
      buf = await resp.arrayBuffer();
    }
    if (cache) {
      try {
        await cache.put(url, new Response(buf, { headers: { 'Content-Type': resp.headers.get('content-type') || 'application/octet-stream' } }));
      } catch (e) { this.onLog('⚠️ 캐시 저장 실패(무시): ' + e.message); }
    }
    return buf;
  }

  _wireCapture() {
    const dec = new TextDecoder();
    this._master.onWrite(([data, ack]) => {
      this._captureBuf += dec.decode(data, { stream: true });
      this._waiters.forEach((w) => w());
      ack();
    });
  }

  /** marker(문자열 substring 또는 RegExp)가 캡처 버퍼에 나타날 때까지 대기. */
  _waitFor(marker, timeoutMs) {
    return new Promise((resolve, reject) => {
      const t0 = Date.now();
      const test = () => {
        if (marker instanceof RegExp) return this._captureBuf.match(marker);
        const i = this._captureBuf.indexOf(marker);
        return i >= 0 ? i : null;
      };
      const tryResolve = () => {
        const r = test();
        if (r !== null && r !== undefined) { this._waiters.delete(w); resolve(r); return true; }
        if (Date.now() - t0 > timeoutMs) { this._waiters.delete(w); reject(new Error('timeout: ' + marker)); return true; }
        return false;
      };
      const w = () => tryResolve();
      if (tryResolve()) return;
      this._waiters.add(w);
    });
  }

  /** VM 자산 다운로드 + 부팅. 멱등(여러 번 호출해도 1회만). */
  init() {
    if (this._ready) return this._ready;
    this._ready = (async () => {
      if (!self.crossOriginIsolated) {
        this.onLog('⚠️ crossOriginIsolated=false — COOP/COEP 헤더(coi-serviceworker) 필요');
      }
      // 1) xterm + xterm-pty 로드 (paste 주입 / onWrite 캡처용)
      await import(XTERM_URL);
      await import(XTERMPTY_URL);
      this.onProgress(5, 'assets');

      // 2) Module 준비 (load.js 가 이걸 참조)
      const base = this.assetBase;
      const Module = (self.Module = self.Module || {});
      const dataUrl = this.dataUrl;
      Module.locateFile = (p) => (dataUrl && p.endsWith('.data')) ? dataUrl : base + p;  // .data 만 별도 URL
      // out.js 를 same-origin Blob URL 로 변환한다.
      //  emscripten pthread 워커는 same-origin 또는 blob 스크립트만 허용 → cross-origin(gorillacell)
      //  URL 을 mainScriptUrlOrBlob 에 그대로 쓰면 new Worker() 가 SecurityError 로 막힌다.
      //  blob URL 은 same-origin 으로 취급되어 워커 생성이 가능하다.
      const outResp = await fetch(base + 'out.js');
      if (!outResp.ok) throw new Error('out.js fetch 실패: ' + outResp.status);
      const outBlobUrl = URL.createObjectURL(new Blob([await outResp.text()], { type: 'text/javascript' }));
      Module.mainScriptUrlOrBlob = outBlobUrl;   // 워커가 이 blob URL 로 생성됨 (same-origin)
      Module.preRun = Module.preRun || [];
      Module.printErr = (t) => this.onLog(t);

      // 2.5) wasm(41MB) — Cache API 캐싱 후 Module.wasmBinary 로 주입(emscripten 내부 fetch 생략)
      Module.wasmBinary = await this._fetchCached(
        base + 'qemu-system-x86_64.wasm',
        (pct, recv, total) => this.onProgress(5 + Math.round(pct * 0.1), `엔진 ${(recv / 1048576) | 0}/${(total / 1048576) | 0}MB`)
      );

      // 2.6) 대용량 rootfs(.data, ~403MB) — Cache API 캐싱 + getPreloadedPackage 로 주입.
      //   load.js 내부 fetch 대신 사용 → 진행률 표시 + 다음부터 다운로드 생략(영구 캐시).
      const dataResolved = (dataUrl) || (base + 'qemu-system-x86_64.data');
      const dataBuf = await this._fetchCached(
        dataResolved,
        (pct, recv, total) => this.onProgress(15 + Math.round(pct * 0.7), `다운로드 ${(recv / 1048576) | 0}/${(total / 1048576) | 0}MB`)
      );
      Module.getPreloadedPackage = () => dataBuf;

      // 3) load.js (데이터 패키지 등록 — getPreloadedPackage 로 즉시) + arg-module.js (QEMU 인자)
      await this._injectScript(base + 'load.js');
      await this._injectScript(base + 'arg-module.js');
      this.onProgress(88, 'boot');

      // 4) PTY 구성
      const { master, slave } = openpty();
      this._master = master;
      this._slave = slave;
      Module.pty = slave;

      // xterm (paste 주입 통로). 표시 요소 없으면 화면 밖.
      let host = this.terminalEl;
      if (!host) {
        host = document.createElement('div');
        host.style.cssText = 'position:absolute;left:-9999px;width:600px;height:200px;';
        document.body.appendChild(host);
      }
      this._xterm = new Terminal({ convertEol: false });
      this._xterm.open(host);
      this._xterm.loadAddon(master);
      this._wireCapture();

      // 5) /pack/info + TTY poll preRun (하네스와 동일)
      const info = 't:' + Math.round(Date.now() / 1000) + '\n';
      Module.preRun.push((mod) => { try { mod.FS.mkdir('/pack'); } catch (e) {} mod.FS.writeFile('/pack/info', info); });
      let readableCallbacks = [];
      slave.onReadable(() => { readableCallbacks.forEach((cb) => cb()); readableCallbacks = []; });
      Module.preRun.push((mod) => {
        mod.TTY.stream_ops.poll = (stream, timeout, notifyCallback) => {
          if (slave.readable) return 1;
          if (notifyCallback != null) {
            notifyCallback.registerCleanupFunc(() => {
              const i = readableCallbacks.indexOf(notifyCallback);
              if (i !== -1) readableCallbacks.splice(i, 1);
            });
            readableCallbacks.push(notifyCallback);
          }
          return 0;
        };
      });

      // 6) out.js (emscripten) 동적 import 후 부팅 — blob URL 로 import (same-origin)
      const mod = await import(outBlobUrl);
      const initEmscriptenModule = mod.default;
      initEmscriptenModule(Module);   // 비동기 부팅 시작 (await 하면 종료까지 안 끝남)

      // 7) 컴파일 서비스 준비(BRIXEL_READY) 대기
      this.onProgress(92, 'booting VM');
      await this._waitFor('BRIXEL_READY', 600000);
      this._booted = true;
      this.onProgress(100, 'ready');
      this.onLog('✅ WASM 컴파일러 준비 완료');
    })();
    return this._ready;
  }

  /**
   * Arduino 스케치를 컴파일한다.
   * @param {string} code   생성된 .ino C++ 코드
   * @param {string} board  'uno' | 'nano' | 'mega' | 'leonardo'
   * @returns {Promise<{ok:boolean, rc:number, hex:?string, flashBytes:?number, flashPct:?number, compileMs:?number, wallMs:number, raw:string}>}
   */
  async compile(code, board = 'uno') {
    await this.init();
    if (this._busy) throw new Error('compile already in progress');
    this._busy = true;
    try {
      this._captureBuf = '';
      const b64 = btoa(unescape(encodeURIComponent(code)));
      let input = 'BRIXEL_BOARD ' + board + '\n';
      for (let i = 0; i < b64.length; i += 200) input += b64.slice(i, i + 200) + '\n';
      input += 'BRIXEL_GO\n';
      const t0 = performance.now();
      this._xterm.paste(input);
      const rcM = await this._waitFor(/BRIXEL_DONE (\d+)/, 180000);
      const wallMs = Math.round(performance.now() - t0);
      const m = this._captureBuf;
      const rc = rcM ? parseInt(rcM[1], 10) : -1;
      const hs = m.indexOf('HEX_START');
      const he = m.indexOf('HEX_END');
      let hex = null;
      if (hs >= 0 && he > hs) hex = m.slice(hs + 'HEX_START'.length, he).replace(/\r/g, '').trim();
      const fb = m.match(/FLASH_BYTES=(\d+)/);
      const pct = m.match(/FLASH_PCT=(\d+)/);
      const cms = m.match(/COMPILE_MS=(\d+)/);
      return {
        ok: rc === 0 && !!hex,
        rc, hex,
        flashBytes: fb ? +fb[1] : null,
        flashPct: pct ? +pct[1] : null,
        compileMs: cms ? +cms[1] : null,
        wallMs,
        raw: m,
      };
    } finally {
      this._busy = false;
    }
  }

  get isReady() { return this._booted; }
}

if (typeof window !== 'undefined') window.BrixelWasmCompiler = BrixelWasmCompiler;
