const CACHE_NAME = "cache-v1";
const CACHE_STATIC_NAME = "static-v1";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
console.log("Sw: instalado");

function cleanCache(cacheName, sizeItems){
    caches.open(cacheName)
    .then(cache =>{
        cache.keys()
        .then(keys => {
            console.log(keys);
            if(keys.length >= sizeItems){
                cache.delete(keys[0]).then(() => {
                    cleanCache(CACHE_DYNAMIC_NAME,sizeItems);
                })
            }
        });
    });
}

self.addEventListener("install",(event) =>{
    //crear caché y almacenar nuestro APPSHELL
    const promesaCache = caches.open(CACHE_STATIC_NAME)
    .then(cache =>{
        return cache.addAll([
            "/20213-PWA-U2-P2-AJVC",
            "index.html",
            "images/noticia1.png",
            "images/noticia2.png",
            "images/noticia3.png",
            "images/noticia4.png",
            "js/app.js",
            "css/pages.js"
        ]);
    });

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then(cacheInmutable =>{
        return cacheInmutable.addAll([
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        ]);
    });
    event.waitUntil(Promise.all([promesaCache,promInmutable]));

    event.waitUntil(promesaCache);
});

self.addEventListener('fetch', (event) =>{
    //console.log(caches.match(event.request));
    
    //2.- cache with network
    // primero va a buscar en cache y despues a la red
     
    const respuestaCache =  caches.match(event.request)
        .then(resp =>{
            // si mi request existe en cache
            if(resp){
                return resp;
            }
            console.log('No esta en caches', event.request.url);
            //voy a ver a la red
            return fetch(event.request)
                .then(respNet => {
                    // abro mi cache
                    caches.open(CACHE_DYNAMIC_NAME)
                        .then(caches => {
                            // guardo la respuesta de la red en cache
                            caches.put(event.request, respNet).then( () =>{
                                cleanCache(CACHE_DYNAMIC_NAME, 5)
                            });
                        });
                    // respondo con el response de la red
                    return respNet.clone();
                });
        }); 

    event.respondWith(respuestaCache);

    
    // 1.- Only cache
    //event.respondWith(caches.match(event.request));
}) 