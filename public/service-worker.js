self.addEventListener('activate', event => {
    console.log("Service worker is working")
})

var CACHE_NAME = 'my-pwa-cache-v1';
var urlsToCache = [
    '/',
    '/styles/styles.css',
    '/script/webpack-bundle.js'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});