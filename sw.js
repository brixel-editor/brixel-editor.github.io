/**
 * Brixel Editor — Service Worker
 *
 * 두 역할을 하나의 SW 로 통합:
 *  1) PWA: network-first 캐시 → 설치 + 오프라인 (모든 OS).
 *  2) Cross-origin isolation: 응답에 COOP/COEP(credentialless) 주입 →
 *     SharedArrayBuffer/WASM 컴파일러(크롬북) 활성화. GitHub Pages 헤더 제약 우회.
 *  (coi-serviceworker 와 scope `/` 충돌을 피하려고 COI 로직을 여기로 병합)
 */

const CACHE_VERSION = 'brixel-v5';
const CACHE_STATIC  = `${CACHE_VERSION}-static`;
const CACHE_DYNAMIC = `${CACHE_VERSION}-dynamic`;

// 페이지 첫 로드 시 미리 캐시할 핵심 정적 자원
const PRECACHE_URLS = [
    './',
    'index.html',
    'ide-styles.css',
    'styles.css',
    'manifest.json',
    'icon.png',
    'brixel-logo.svg',
    'brixel-logo-transparent.svg'
];

// 설치 — 정적 자원 사전 캐싱
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then((cache) => cache.addAll(PRECACHE_URLS).catch(err => {
                console.warn('[SW] 일부 자원 사전 캐시 실패:', err);
            }))
            .then(() => self.skipWaiting())
    );
});

// 활성화 — 옛 캐시 정리
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => !k.startsWith(CACHE_VERSION))
                    .map((k) => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// COOP/COEP 헤더 주입 — cross-origin isolation (SharedArrayBuffer/WASM 컴파일러).
// coi-serviceworker 의 credentialless 로직을 캐시 전략과 병합.
const COEP_CREDENTIALLESS = true;
function withCoiHeaders(response) {
    // opaque(no-cors, status 0) 응답은 헤더 수정 불가 → 그대로 반환
    if (!response || response.status === 0) return response;
    const h = new Headers(response.headers);
    h.set('Cross-Origin-Embedder-Policy', COEP_CREDENTIALLESS ? 'credentialless' : 'require-corp');
    if (!COEP_CREDENTIALLESS) h.set('Cross-Origin-Resource-Policy', 'cross-origin');
    h.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: h
    });
}

// fetch — COI 헤더 주입 + network-first 캐시(오프라인 fallback)
self.addEventListener('fetch', (event) => {
    const { request } = event;
    // GET / HTTP 만, 그 외 스킴 무시
    if (request.method !== 'GET') return;
    if (!request.url.startsWith('http')) return;
    // 에이전트 API / WebSocket 은 가로채지 않음 (실시간 통신 보존).
    // ⚠️ 'http://localhost:' 광역 제외 금지 — 사이트가 localhost 로 서빙될 때
    //    모든 요청이 걸려 COI 헤더가 안 입혀진다. 에이전트는 /api/(GET) + ws:// + POST(아래 GET 체크)로 충분히 걸러짐.
    if (request.url.includes('/api/') || request.url.startsWith('ws://')) return;

    // COEP credentialless: cross-origin no-cors 요청은 credentials 제거
    const req = (COEP_CREDENTIALLESS && request.mode === 'no-cors')
        ? new Request(request, { credentials: 'omit' })
        : request;

    event.respondWith(
        fetch(req)
            .then((response) => {
                // 같은 출처 정상 응답은 캐시(원본 저장) 후 COI 헤더 입혀 반환
                if (response.status === 200 && response.type === 'basic') {
                    const copy = response.clone();
                    caches.open(CACHE_DYNAMIC).then((cache) => cache.put(request, copy));
                }
                return withCoiHeaders(response);
            })
            .catch(() =>
                caches.match(request)
                    .then((cached) => cached || caches.match('index.html'))
                    .then((cached) => cached ? withCoiHeaders(cached) : Response.error())
            )
    );
});
