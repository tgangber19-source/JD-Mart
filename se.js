const CACHE_NAME = "jdmart-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./manifest.json"
];

// Service Worker Install करना
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// लाइव डेटा के लिए Firebase को छोड़कर बाकी सब कैश (Cache) करना
self.addEventListener("fetch", event => {
    if (event.request.url.includes("firestore.googleapis.com") || event.request.url.includes("firebaseio.com")) {
        return;
    }
    
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
