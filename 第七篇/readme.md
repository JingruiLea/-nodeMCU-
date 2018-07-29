# bus.js 与 LampServer.js 的使用

首先感谢14组同学为我提出的宝贵修改意见.
----
## 用手机Web端控制NodeMCU, 主要是bus.js与LampServer.js的通信  

## 1.更新后台代码
用`VS Code`(以下简称`Code`)打开**后台**(`NodeMCULightBackground`)文件夹, **在另外的文档中保存你认为重要的修改**.本操作将会是你的代码与Git仓库完全相同. 打开`Code`的控制台, 输入.
```Bash
git stash
git pull
```
如果你不放心, 可以与git上的代码对比, 看是否一样.  
如果想要恢复你的现场:
```Bash
git stash pop
```
> PS : 学习Git, git stash, git pull 的使用, 以备不时之需.

## 2.更新前端代码
用`Code`打开前端文件夹(`NodeMCULightWeb`), 进行相同操作.

## 3.LampServer.js
`LampServer.js`代表灯泡服务器, `webs`变量代表你所有打开的网页.  
通过如下代码, 即可向网页(`bus.js`)发送消息.  
## webs.boradcast(message)
+ `message` <`String`> <必须>. 将`message`发送给各个网页(`bus.js`).  

下面是发送示例: 
```JavaScript
webs.broadcast('Hello~~~~') //向网页发送hello
```
## webs.addMessageListener(callback)
+ `callback` <`Function`> <必须>. 收到来自网页(`bus.js`)消息后的回调函数.  

下面是接收示例: 
```JavaScript
webs.addMessageListener(# (message){
    console.log(message)
})
```
或者使用`lambda`表达式:
```JavaScript
webs.addMessageListener(msg => console.log)
```
## 4.bus.js
## socket.on('message', callback)
+ `callback` <`Function`> <必须>. 收到来自服务器(`LampServer.js`)消息后的回调函数.   

下面是发送示例: 
```JavaScript
socket.on('message', # (message) { 
  console.log('服务器发来消息:' + message)
  if(message == '新设备!'){
    bus.lampList.push({
        id: 123,
        name:'客厅顶灯',
        voltage: 3.2
    })
  }
});
```

## socket.send(message)
+ `message` <`String`> <必须>. 发送给服务器`LampServer.js`的消息

下面是发送示例: 
```JavaScript
socket.send('嘤嘤嘤')
```

## bus.lampList
+ <`Array`> 数组, 用来决定主界面显示的灯泡列表.
+ 使用`lampList.push`添加.

## bus.lamplist.item
+ <`Object`>对象
+ name <`String`> 必须, 表示灯泡名字, 用以展示  
+ id <`Number`> 必须, 表示灯泡ID, 用来索引
+ voltage <`Number`> 可选的, 表示电压, 不填则永远满电.   
+ 其他项目顾名思义都是可选的!!!不会就问我吧..   
下面是默认示例:
```JavaScript
lampList: [
      {
        id: 123,
        name: '客厅顶灯',
        voltage: 3.2
      },
      {
        id: 456,
        name:'卧室灯',
        voltage: 2.2
      }
    ]
```
## openLight()
当打开灯开关时运行此方法
> ps : 你在这你就给服务器发那个开灯的消息,收到后开灯就完了.用那个socket.send!!!!

## closeLight()
当关闭灯开关时运行此方法

## changeBrightness(val)
当用户改变亮度条时运行此方法
+ `val` <`Number`> 范围 `0-100`

# changeRed(red)
改变红灯时运行此方法
+ `red` <`Number`> 范围 `0-100`

# changeBlue(blue)
改变蓝灯时

# changeGreen(green)
改变绿灯时

# changeName(name)
改变名字时

# complete()
点击完成按钮时