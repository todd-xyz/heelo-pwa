### PWA : Progrssive Web App

缓存策略：静态资源缓存优先；动态资源网络优先。
+ cache only
+ network only.
+ Cache, faill back to Network.
+ Network faill back to Cache.
+ Cache & Network race.
+ 

1. manifest.json
 ```json
 {
    "name": "Hello world App",
    "short_name": "Hello",
    "lang": "en-US",
    "start_url": "/index.html",
    "icons": [
        {
            "src": "./images/location.png",
            "sizes": "48x48",
            "type": "image/png"
        }
    ],
    "display": "standalone",
    "background_color": "red",
    "theme_color": "white"   
}
```

2. register service when windows onload events.
   ``` javascript
     if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js')
    }
   ```

3. service worker js file, reference sw.js
   
   `install` , `activate` and `fetch` envents

4. Notification
```javascript
    if(!navigator.onLine){
        new Notification('提示',{body: '现在没有联网，将使用缓存。'})
    }
    window.addEventListener('online',()=>{
        new Notification('提示',{body: '现在已联网，请刷新！！！'})
    }) 
```
