// service-worker.js
const CACHE_NAME = 'sales-finance-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Thêm các tài nguyên tĩnh khác của ứng dụng React của bạn vào đây.
  // Ví dụ: '/static/js/main.chunk.js', '/static/css/main.css',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Đã mở bộ nhớ cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: Lỗi khi thêm tài nguyên vào cache:', error);
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
      .catch(error => {
        console.error('Service Worker: Lỗi khi xử lý yêu cầu fetch:', error);
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
            console.log('Service Worker: Đang xóa bộ nhớ cache cũ:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
