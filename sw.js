/**
 * Brixel Editor — Service Worker (PWA 기본 캐시)
 *
 * 정책: network-first (앱 본체) + cache-first (정적 에셋)
 * 안드로이드 태블릿에서 "홈 화면 추가" 시 앱처럼 동작.
 */

const CACHE_VERSION = 'brixel-v1';
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

// fetch — network-first 전략 (오프라인 시 캐시 fallback)
self.addEventListener('fetch', (event) => {
    const { request } = event;
    // GET 만 처리, HTTP/HTTPS 외 스킴 무시
    if (request.method !== 'GET') return;
    if (!request.url.startsWith('http')) return;
    // 에이전트 API 는 캐시하지 않음 (실시간 상태 의존)
    if (request.url.includes('/api/') ||
        request.url.startsWith('http://localhost:') ||
        request.url.startsWith('ws://')) return;

    event.respondWith(
        fetch(request)
            .then((response) => {
                // 성공 응답이면 dynamic 캐시에 저장 (HEAD only 등은 제외)
                if (response && response.status === 200 && response.type === 'basic') {
                    const copy = response.clone();
                    caches.open(CACHE_DYNAMIC).then((cache) => cache.put(request, copy));
                }
                return response;
            })
            .catch(() => caches.match(request).then((cached) => cached || caches.match('index.html')))
    );
});
