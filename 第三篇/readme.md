## 通讯协议的学习与设计
******************

### 本文章将实现NodeMCU与局域网内你的电脑的通信. 然后我们可以把你电脑中的程序部署到树莓派上, 从而实现NodeMCU与边缘网关的通信. 
### 另外, 我们还展示了一种可能的通讯协议,实现灯的控制和对环境的感知, 以及一种消息解析器的设计.

## 设计通信协议
### 设计一个通信协议, 实现灯的控制和对环境的感知.
当然设计方法有很多种, 具体实现细节也有很多, 各位可以尽情发挥, 这里仅提供一种可能的设计.  
首先, 所有的消息由一个json字符串构成.  
最外层对象包含两个特定的key: `cmd`和`args`,分别代表命令和参数.  
+ `cmd`的值为一个字符串, 代表NodeMCU将要执行的命令.  
+ `args`的值可以为整数, 字符串, json字符串, 代表当前命令的参数.  

全部示例如下:
|消息原型| CMD | 解释 | ARGS | 解释|
|:-----:| :-: | :--: | :--: | :-:|
|{"cmd":"setBrightness", "args":120}|setBrightness|设定亮度|120|亮度值(整数, min:0,max1000)|
|{"cmd":"setName", "args":"客厅顶灯"}|setName|设定灯的名字|客厅顶灯|灯的名字(字符串)|
|{"cmd":"setInterval", "args":2000}|setInterval|设定传感器感应间隔|2000|(整数 ,单位: 毫秒, 最小值: 200)|
|{"cmd":"setColor", "args":{"r":120,"g":120,"b":120}}|setColor|设定灯的颜色|RGB:120,120,120|颜色的rgb值(json字符串)|
## 推荐的消息解析器设计(需要添加自动重连功能)
下面是推荐的消息解析器设计, 通过dis数组和dispatch函数对命令进行分发.  
只实现了`setName`和`setBrightness`命令
```Lua
dis = {}
function dispatch(client, message)         --分发函数
     print("receive message: "..message)   --将收到的内容打印
     local pack = sjson.decode(message)    --解析消息
     if pack.cmd~=nil and dis[pack.cmd] then   --如果消息的'cmd'不为空
          dis[pack.cmd](pack)              --调用与cmd内容同名的函数
     end
end

function setName(pack)
   -- your code
end

function setBrightness(pack)
   -- your code
end

sk = net.createConnection(net.TCP, 0)
sk:connect(10086, '192.168.3.3')
sk:on("disconnection", function(c)end)
sk:on("receive", dispatch)
sk:on("connection", function(sck, c)
    print('connected')
end)
```