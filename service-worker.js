self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-cache").then((cache) => {
      return cache
        .addAll([
          "./", // Root
          "./index.html",
          "./app.js",
          "./service-worker.js",
          "./manifest.json",
        ])
        .catch((err) => console.error("Cache addAll error:", err));
    })
  );
});
