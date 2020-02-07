// Installing Service Worker
self.addEventListener('install', function(e) {
	console.log('[Service Worker] Install');
	e.waitUntil(
	  caches.open(cacheName).then(function(cache) {
		console.log('[Service Worker] Caching all: app shell and content');
		return cache.addAll(appShellFiles);
	  })
	);
  });

// Files to cache
var cacheName = 'PWA';
var appShellFiles = [
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
