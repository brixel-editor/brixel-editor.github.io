/*! coi-serviceworker v0.1.7 — https://github.com/gzuidhof/coi-serviceworker (MIT)
 * GitHub Pages 처럼 커스텀 헤더를 못 넣는 정적 호스팅에서 cross-origin isolation
 * (COOP/COEP)을 서비스워커로 주입한다. SharedArrayBuffer/pthreads(=WASM 컴파일러)에 필요.
 *
 * credentialless 모드: GitHub Release 등 cross-origin 자산(qemu.data)을 CORP 헤더 없이도
 * no-cors 로 가져올 수 있게 한다(Chrome/크롬북 지원).
 */
/*eslint-env serviceworker*/
if (typeof window === 'undefined') {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener('message', (ev) => {
    if (!ev.data) return;
    if (ev.data.type === 'deregister') {
      self.registration.unregister().then(() => self.clients.matchAll()).then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      });
    }
  });

  self.addEventListener('fetch', function (event) {
    const r = event.request;
    if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;

    const request = (coepCredentialless && r.mode === 'no-cors')
      ? new Request(r, { credentials: 'omit' })
      : r;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) return response;
          const newHeaders = new Headers(response.headers);
          newHeaders.set('Cross-Origin-Embedder-Policy', coepCredentialless ? 'credentialless' : 'require-corp');
          if (!coepCredentialless) newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
          newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
          return new Response(response.body, { status: response.status, statusText: response.statusText, headers: newHeaders });
        })
        // 업스트림 fetch 실패(예: 중지된 에이전트 localhost:8080)는 그대로 네트워크 에러로
        // 전파해야 한다. undefined 를 respondWith 에 주면 "Failed to convert to Response" 에러.
        .catch((e) => Response.error())
    );
  });

  // credentialless 기본 ON (cross-origin Release 자산 호환)
  let coepCredentialless = true;
  self.addEventListener('message', (ev) => {
    if (ev.data && ev.data.type === 'coepCredentialless') coepCredentialless = ev.data.value;
  });
} else {
  (() => {
    const reloadedBySelf = window.sessionStorage.getItem('coiReloadedBySelf');
    window.sessionStorage.removeItem('coiReloadedBySelf');
    const coepDegrading = (reloadedBySelf == 'coepdegrade');

    const coi = {
      shouldRegister: () => !reloadedBySelf,
      shouldDeregister: () => false,
      coepCredentialless: () => true,
      coepDegrade: () => true,
      doReload: () => window.location.reload(),
      quiet: false,
      ...window.coi,
    };

    const n = navigator;
    if (n.serviceWorker && n.serviceWorker.controller) {
      n.serviceWorker.controller.postMessage({ type: 'coepCredentialless', value: coi.coepCredentialless() });
    }

    if (!window.crossOriginIsolated && !coepDegrading && coi.shouldRegister()) {
      if (!window.isSecureContext) {
        !coi.quiet && console.log('COOP/COEP 서비스워커는 secure context(HTTPS/localhost)에서만 동작합니다.');
        return;
      }
      if (n.serviceWorker) {
        n.serviceWorker.register(window.document.currentScript.src).then(
          (registration) => {
            !coi.quiet && console.log('COOP/COEP 서비스워커 등록 성공:', registration.scope);
            registration.addEventListener('updatefound', () => {
              !coi.quiet && console.log('새 COOP/COEP 서비스워커 설치 중 — 리로드.');
              window.sessionStorage.setItem('coiReloadedBySelf', 'updatefound');
              coi.doReload();
            });
            if (registration.active && !n.serviceWorker.controller) {
              window.sessionStorage.setItem('coiReloadedBySelf', 'notcontrolling');
              coi.doReload();
            }
          },
          (err) => { !coi.quiet && console.error('COOP/COEP 서비스워커 등록 실패:', err); }
        );
      }
    }
  })();
}
