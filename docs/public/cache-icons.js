const cacheName = "fa-free-icon-cache-v1";
const iconOrigin = "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free";

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(iconOrigin)) {
        event.respondWith(
            caches.open(cacheName).then(async (cache) => {
                return cache.match(event.request).then((response) => {
                    return (
                        response ||
                        fetch(event.request).then((networkResponse) => {
                            cache.put(event.request, networkResponse.clone());

                            return networkResponse;
                        })
                    );
                });
            }),
        );
    }
});
