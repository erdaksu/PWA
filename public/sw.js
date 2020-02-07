
// Files to cache
var cacheName = 'js13kPWA-v1';
var appShellFiles = [
  '/PWA/public/',
  '/PWA/public/index.html',
  '/PWA/public/style.css',
  '/PWA/public/app.js',
  '/PWA/public/sw.js',
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

var coursesImages = [];
for(var i=0; i<courses.length; i++) {
  coursesImages.push('data/img/'+courses[i].slug+'.png');
}
var contentToCache = appShellFiles.concat(coursesImages);

// Installing Service Worker
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

// Fetching content using Service Worker
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});