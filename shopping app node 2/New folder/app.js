
// check if browser supports service worker

if('serviceWorker'in navigator){
    // this asyncronous task registers the service worker
    navigator.serviceWorker.register('./sw.js')
    // since it's asynchronous we can use the .then method
    .then((reg) => console.log('service worker registered', reg))
    // and .catch to alert of any errors
    .catch((err) => console.log('service worker not registered', err))
}