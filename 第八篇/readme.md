# 用MQTT协议连接百度天工平台并实现远程控制

## 打包Web前端
**请确认你的web前端完成,不用再修改任何内容**  
**请确认你的web前端完成,不用再修改任何内容**  
**请确认你的web前端完成,不用再修改任何内容**  
**以后发现错误,请把这些修改还原进行调试**
1. 修改`bus.js`第四行
```JavaScript
const socket = io('http://localhost:8080'); 
```
改为:
```JavaScript
const socket = io('/'); 
```
2. 修改`WebSocket.js`前两行
```JavaScript
var webSocketServer = require('socket.io')(8080);
```
改为:
```JavaScript
const server = require('./www')
var webSocketServer = require('socket.io')(server);
```
3. 修改`www.js`第14行
```JavaScript
var port = normalizePort(process.env.PORT || '8080');
```
改为:
```JavaScript
var port = normalizePort(process.env.PORT || '80');
```
4. 在Web前端(`NodeMCULightWeb`)工程目录下运行命令行:
```Bash
npm run build
```
5. 移动`NodeMCULightWeb/dist`下的`static`文件夹和`index.html`,到`NodeMCULightBackground/public`下.
6. 启动服务器,进入 [http://localhost](http://localhost) 即可看到打包好的页面.
7. 将`NodeMCULightBackground`工程用`scp`命令(自行百度)拷贝到树莓派.  
树莓派用户名: `pi`  
密码: `raspberry`  
示例:
```Bash
scp -r ./* pi@172.16.1.1:/var/www/
```
8. `ssh`连接树莓派并启动服务器.
```Bash
ssh pi@172.16.1.1
sudo apt-get install node
cd /var/www
cd /bin
nodejs LampServer
```
手机访问[http://172.16.1.1](http://172.16.1.1)即可进入界面.  
9. (**可选**)将`nodejs`服务器设置为开机启动, 自己百度.

