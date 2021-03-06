const PRECACHE = 'precache-v2.3';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  '/',
  "/audio",
  "/inspiration",
  "/connect",
  'css/styles.css',
  'css/home.css',
  'css/audio.css',
  'css/under-const.css',
  'js/model.js',
  'js/view.js',
  'js/controller.js',
  'assets/audio_waves.png',
  'assets/bg1.jpg',
  'assets/bg4-double_b-w.jpg',
  'assets/blueprint.png',
  'assets/logo-large.png',
  'assets/logo.png',
  'assets/puzzle.jpg',
  'assets/under_const.jpg',
  'assets/yakov.jpg',
  'https://consciousj.s3.us-east-2.amazonaws.com/audio/Introduction to Conscious Judaism.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
