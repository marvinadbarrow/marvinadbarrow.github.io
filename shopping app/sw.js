
const assets = ['/', '/index.html', '/app.js', '/style.css',
'./images fish/crab sticks.jpg',
'./images fish/fish cakes.jpg', 

'./images meat/bacon.jpg',
'./images meat/tortelloni meat.jpg',
'./images meat/quiche meat.jpg',

'./images vegetarian/quiche veg.jpg',
'./images vegetarian/tortelloni veg.jpg',

'./images dairy/milk.jpg',
'./images dairy/cheese.jpg',
'./images dairy/cold latte.jpg',

'./images fruit & veg/carrots.jpg',
'./images fruit & veg/corn cob.jpg',
'./images fruit & veg/tomatoes.jpg',

'./images bakery/biscuits.jpg',
'./images bakery/cookies.jpg',
'./images bakery/breadloaf.jpg',
'./images bakery/breadroll.jpg',
'./images bakery/granola slices.jpg',

'./images pastry/cinnamon swirl.jpg',
'./images pastry/maple pecan.jpg',
'./images pastry/flapjacks.jpg',

'./images hot drinks/coffee.jpg',
'./images hot drinks/hot chocolate.jpg',
'./images hot drinks/ovaltine.jpg',
'./images hot drinks/tea.jpg',

'./images cold drinks/coca cola.jpg',
'./images cold drinks/dr pepper.jpg',

'./images alcohol/crabbies.jpg',

'./images toiletries/air freshener.jpg',
'./images toiletries/hand wash.jpg',
'./images toiletries/lynx.jpg',
'./images toiletries/shower gel.jpg',
'./images toiletries/toilet tissue.jpg',
'./images toiletries/toothbrush.jpg',
'./images toiletries/toothpaste.jpg',

'./images cleaning/bleach.jpg',
'./images cleaning/surface cleaner.jpg',
'./images cleaning/washing powder.jpg',
'./images cleaning/washing up liquid.jpg',

'./images misc/monkey nuts.jpg',
'./images misc/popcorn.jpg',
'./images misc/olive oil.jpg',


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
        console.log(cache)
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