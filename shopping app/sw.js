
const assets = ['/', '/index.html', '/app.js', '/style.css',

];





const staticCache = 'main-shopping-assets'

// INSTALL SERVICE WORKER
self.addEventListener('install', event =>{

    // install has to wait until code inside is complete before finishing the install and exiting. 
    event.waitUntil(
       // storing assets in the cache
    caches.open(staticCache) // open the chache named main assets
    .then(cache =>{ // then console log to alert user of process
        console.log('caching shell assets')
        cache.addAll(assets) // chache everything in assets
    })   
        )
} )



// ACTIVATE sw
self.addEventListener('activate', event =>{
    console.log('service worker has been activated')
    // deleting old cache's 
    event.waitUntil(
caches.keys().then(keys =>{ // hellow
    console.log(keys);
    return Promise.all(keys
    .filter(key => key !== staticCache)
    .map(key => caches.delete(key))    
        )
})

    )
})

// fetch event
self.addEventListener('fetch', event =>{
    //console.log('fetch event', event)

    // check cache to see if anything in the cache matches anything in the the fetch request if there is a match the fetch will get the data from cache rather than than completing the fetch
    event.respondWith(
caches.match(event.request).then(cacheRes =>{
    return cacheRes || fetch(event.request)
})

    )
})