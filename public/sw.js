// Files to cache
var cacheName = 'V1';
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

self.addEventListener('install', (e) => {
	console.log('[Service Worker] : SW Installed');
	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('[Service Worker] : SW Caching Files');
				cache.addAll(cacheAssets);
			}).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (e) => {
	console.log('[Service Worker] : SW Activated');

	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						console.log("[Service Worker] : SW Deleted Old Cache");
						return caches.delete(cache);
					}
				})
			)
		})
	)
});