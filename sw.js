// 🔥 UPDATED SERVICE WORKER - No Cache Issues

const CACHE_VERSION = 'v3';  // Change this to force update
const CACHE_NAME = `searchai-${CACHE_VERSION}`;

// Install - Don't cache anything on install
self.addEventListener('install', event => {
    self.skipWaiting();  // Force immediate activation
});

// Activate - Delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Always try network first, fallback to cache
self.addEventListener('fetch', event => {
    // Skip caching for API calls
    if (event.request.url.includes('groq.com') || 
        event.request.url.includes('openrouter.ai') ||
        event.request.url.includes('firebase') ||
        event.request.url.includes('googleapis.com')) {
        return;
    }
    
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clone the response
                const responseClone = response.clone();
                
                // Update cache with fresh version
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseClone);
                });
                
                return response;
            })
            .catch(() => {
                // If network fails, try cache
                return caches.match(event.request);
            })
    );
});