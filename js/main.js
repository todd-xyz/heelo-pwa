window.onload =()=>{
    'use strict'

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js')
    }
    if(Notification.permission === 'default'){
        Notification.requestPermission();
    }

    if(!navigator.onLine){
        new Notification('提示',{body: '现在没有联网，将使用缓存'})
    }

    window.addEventListener('online',()=>{
        new Notification('提示',{body: '现在已联网，清刷新！！！'})
    })
    //w()
  
 
}

// async function w(){
//     let rs = await fetch('http://localhost:8080/api')
//     let resonse =await rs.json()
//     console.log(resonse)
//     let ele = document.createElement('p')
//     ele.innerHTML='<span>' + resonse.name + '</span>'
//     document.body.appendChild(ele)
// }