
/**
 * PWD
 * Start data 2012-04-16
 * 为Autodesk forge 缓存服务。
 * 参考视频 : https://www.bilibili.com/medialist/play/ml924455495
 */
const CACHE_NAME = 'hello-v1'
const STATIC_URL = [
    './',
    './index.html',
    './css/style.css',
    './images/location.png',
    './js/main.js',
    './manifest.json'
];

//start the servcie worker and cache all of the aap' content
self.addEventListener('install', async e => {
    try {
        let cache = await caches.open(CACHE_NAME);
        await cache.addAll(STATIC_URL);
        console.log('install service worker success.');
        await self.skipWaiting()  //activate with immdiate effect.
    } catch (e) {
        console.log("Install service worker err:", e)
    }
})

self.addEventListener('activate', async e => {
    //Clear the old cache.
    const keys = await caches.keys();
    keys.forEach(key => {
        if (key !== CACHE_NAME) {
            caches.delete(key)
        }
    })
    await self.clients.claim()
})

//server cached cotent when offline
self.addEventListener('fetch', (e) => {
    //判断是否同源
    // const req = e.request
    // let url = new URL(req.url)   //origin @example http://localhost
    // if (url.origin !== self.origin) {
    //     return;
    // }
    const req = e.request
    if (req.url.includes('/api')) {
        e.respondWith(networkFirst(req))
    } else {
        e.respondWith(cachFirst(req))
    }
})

//缓存优先，适用于静态资源
async function cachFirst(req) {
    let cache = await caches.open(CACHE_NAME)
    let cached = await cache.match(req)
    //缓存了该数据
    if (cached) {
        return cached
    } else {
        let fresh = await fetch(req)
        return fresh
    }
}

//网络优先，先获取网络资源,缓存该数据。
async function networkFirst(req) {
    try {
        console.log("req", req)
        let response = await fetch(req)
      
        if (response.status === 200) {
           
            let cache =await caches.open(CACHE_NAME)
            let r = await cache.put(req,response.clone())
        }

        return response;
    } catch (e) {
        let cached = await caches.match(req);
        return cached;
    }
}

