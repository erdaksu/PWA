self.importScripts('data/courses.js');

// Files to cache
const cacheName = 'PWA';
const dynamicCache = 'PWA-V1';
const appShellFiles = [
  '/PWA/public/',
  '/PWA/public/index.html',
  '/PWA/public/style.css',
  '/PWA/public/app.js',
  '/PWA/public/favicon.ico',
  '/PWA/public/manifest.webmanifest',
  '/PWA/public/data/img',
  '/PWA/public/data/courses.js',
  '/PWA/public/icons/icon-32.png',
  '/PWA/public/icons/icon-64.png',
  '/PWA/public/icons/icon-96.png',
  '/PWA/public/icons/icon-128.png',
  '/PWA/public/icons/icon-168.png',
  '/PWA/public/icons/icon-192.png',
  '/PWA/public/icons/icon-256.png',
  '/PWA/public/icons/icon-512.png',
  '/PWA/public/img/logo.png',
];

const courseImages = [];
for (let i = 0; i < courses.length; i++) {
    coursesImages.push('data/img/' + courses[i].slug + '.png');
}
const contentToCache = appShellFiles.concat(courseImages);

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Installing');
  e.waitUntil(
      caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
          return cache.addAll(contentToCache);
      })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Activated');
  e.waitUntil(
      caches.keys().then(keys => {
          return Promise.all(keys
              .filter(key => key !== cacheName)
              .map(key => caches.delete(key)))
      })
  )
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
      caches.match(e.request).then(function (r) {
          console.log('[Service Worker] Fetching resource: ' + e.request.url);
          return r || fetch(e.request).then(function (response) {
              return caches.open(dynamicCache).then(function (cache) {
                  console.log('[Service Worker] Caching new resource: ' + e.request.url);
                  cache.put(e.request, response.clone());
                  return response;
              });
          });
      })
  );
});
