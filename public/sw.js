const CACHE_NAME = "village-podor-v1";

// Ressources à mettre en cache lors de l'installation
const PRECACHE_URLS = ["/", "/logo the village.webp", "/centre culturel.webp"];

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

  // Ne pas intercepter les requêtes non-GET ou cross-origin vers des APIs
  if (e.request.method !== "GET") return;

  // Strategy: Stale-While-Revalidate pour les assets statiques
  // Cache-First pour les images et fonts déjà en cache
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((response) => {
          // Mettre en cache uniquement les réponses valides et les assets statiques
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

      // Si on a un cache, on le retourne immédiatement + revalidation en arrière-plan
      return cached || fetchPromise;
    }),
  );
});
