const CACHE_NAME = 'eco-sports-v3.1';
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
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Kesh ochildi va fayllar saqlanmoqda...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

// Tarmoq so'rovlarini ushlab qolish va keshdan javob berish
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Agar keshda bo'lsa, keshdan qaytaradi
                if (response) {
                    return response;
                }
                // Aks holda tarmoqdan yuklaydi
                return fetch(event.request).then(
                    (networkResponse) => {
                        // Keshga yangi fayllarni qo'shish ixtiyoriy
                        return networkResponse;
                    }
                );
            })
    );
});

// Eski keshlarni tozalash
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
