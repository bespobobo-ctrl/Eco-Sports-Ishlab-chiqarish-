const CACHE_NAME = 'eco-sports-v4.3';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/workshop3d.js',
    '/manifest.json',
    '/icons/icon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// O'rnatish bosqichida fayllarni keshga saqlash
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Yangi service worker-ni kutmasdan darhol faollashtirish
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Kesh ochildi va fayllar saqlanmoqda...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Tarmoq so'rovlarini boshqarish (Network-First local fayllar uchun, Cache-First tashqi kutubxonalar uchun)
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);
    const isLocal = url.origin === self.location.origin;

    if (isLocal) {
        // Network-First: yangi o'zgarishlar darhol ko'rinishi uchun
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    } else {
        // Cache-First tashqi yuklamalar uchun (font-awesome, chart.js)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request);
                })
        );
    }
});

// Eski keshlarni tozalash va mijozlarni nazorat qilish
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        Promise.all([
            self.clients.claim(), // Yangi SW sahifani darhol boshqaruvga oladi
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            console.log('Eski kesh o\'chirildi:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
