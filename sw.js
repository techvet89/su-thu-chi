// sw.js (Service Worker)
// Đây là một Service Worker cơ bản để hỗ trợ PWA.
// Bạn có thể tùy chỉnh để thêm caching tài nguyên, xử lý offline, v.v.

const CACHE_NAME = 'so-thu-chi-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Thêm các tài nguyên tĩnh khác của bạn vào đây nếu có
  // ví dụ: '/icon-192x192.png', '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
