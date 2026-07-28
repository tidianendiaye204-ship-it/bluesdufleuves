const CACHE_NAME = "village-podor-v2"; // Force le vidage de l'ancien cache

// Ressources à mettre en cache lors de l'installation (on ne met plus "/" pour éviter de bloquer l'HTML)
const PRECACHE_URLS = ["/logo the village.webp", "/centre culturel.webp"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener("activate", (e) => {
  // Supprimer les anciens caches
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Ne pas intercepter les requêtes non-GET
  if (e.request.method !== "GET") return;

  // Stratégie NETWORK-FIRST pour la navigation (HTML) pour avoir toujours la dernière version !
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Stratégie CACHE-FIRST avec revalidation en arrière-plan pour les assets statiques
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((response) => {
          if (
            response.ok &&
            (url.pathname.match(/\.(webp|jpg|jpeg|png|svg|woff2|woff|css)$/) ||
              url.hostname === "fonts.gstatic.com" ||
              url.hostname === "fonts.googleapis.com")
          ) {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, cloned));
          }
          return response;
        })
        .catch(() => cached); // En cas d'erreur réseau, servir le cache

      return cached || fetchPromise;
    }),
  );
});
