# 外网通信
## 学习MQTT协议

https://cloud.baidu.com/doc/IOT/GettingStarted.html

## 修改bus.js, 使前端支持MQTT
在Web前端文件夹中运行`npm install paho-mqtt -s`. 
下载群文件中的`bus.js`替换`bus.js`. 
按照注释修改`clientId`和`topic`.   
下载群文件中的`paho-mqtt.js`或者`https://raw.githubusercontent.com/eclipse/paho.mqtt.javascript/master/src/paho-mqtt.js`替换`./NodeMCULightWeb/node_modules/paho-mqtt/paho-mqtt.js`  
运行`npm run dev`,访问`localhost:8081`.  
效果:
![ok](./ok.png)

## 自行修改bus.js

## 修改后台代码, 使其支持MQTT
在后台运行`npm install -s mqtt`安装`mqtt`支持.  
下载群文件中`mqtt.js`, 放到`bin`文件夹下.  
修改`topic`和`clientId`.

## 在LampServer.js中使用
```JavaScript
const mqc = require('./mqtt.js')

mqc.onerror = function(err){

}

mqc.onconnect = function(){
    console.log('conneawrfteryjct')
    mqc.send('hello')
}

mqc.onmessage = function(topic, payload, packet){
    console.log(payload.toString())
}

```

