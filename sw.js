const cacheName = "restaurant-v5";

self.addEventListener('install', (event) => {
 event.waitUntil(
   caches.open(cacheName).then((cache) => {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg',
       ]).then(() => {
        console.log('Finished caching all files!');
      }).catch((error) => {
        console.log('Caching threw an error: ', error);
      })
    })
   );
});

self.addEventListener('activate',(event)=>{
  event.waitUntil(
    caches.keys().then((keys)=>{
      return Promise.all(
        keys.map((key)=>{
          if(key!=cacheName)
            return caches.delete(key);
        })
        )
    })
    );
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();
          caches.open(cacheName).then(function(cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function() {
          return new Response('<h1>This page Not visited or cached!</h1>'
            , {
            headers: {'Content-Type': 'text/html'}
          });
        })
      }
    })
  )
});