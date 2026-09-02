const SHELL_CACHE = "recplus-shell-v1";
const RUNTIME_CACHE = "recplus-runtime-v1";
const SHELL_PATHS = [
  "/",
  "/games",
  "/create",
  "/items",
  "/cuesheets",
  "/offline",
  "/manifest.webmanifest",
  "/icons/recplus-icon.svg",
  "/icons/recplus-maskable.svg",
];

function canCache(response) {
  return response && response.ok && response.type === "basic";
}

function cacheResponse(cacheName, request, response) {
  if (canCache(response)) {
    void caches.open(cacheName).then((cache) => cache.put(request, response.clone()));
  }
  return response;
}

function isOfflineReadyNavigation(pathname) {
  return pathname === "/"
    || pathname === "/games"
    || pathname === "/create"
    || pathname === "/items"
    || pathname === "/cuesheets"
    || pathname.startsWith("/play/");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => Promise.allSettled(SHELL_PATHS.map((path) => cache.add(path))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith("recplus-") && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // App Router의 RSC 응답이나 인증 요청은 사용자별 상태를 포함할 수 있어 캐시하지 않습니다.
  if (request.headers.has("RSC") || request.headers.has("Next-Router-State-Tree")) return;

  if (request.mode === "navigate" && isOfflineReadyNavigation(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((response) => cacheResponse(RUNTIME_CACHE, request, response))
        .catch(async () => (await caches.match(request)) || (await caches.match("/offline"))),
    );
    return;
  }

  const staticAsset = url.pathname.startsWith("/_next/static/")
    || url.pathname.startsWith("/icons/")
    || url.pathname === "/manifest.webmanifest";
  if (!staticAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request)
      .then((response) => cacheResponse(SHELL_CACHE, request, response))),
  );
});
