## 通讯协议的学习与设计
******************

### 本文章将带你实现NodeMCU与局域网内你的电脑的通信. 然后我们可以把你电脑中的程序部署到树莓派上, 从而实现NodeMCU与边缘网关的通信. 
### 另外, 我们还展示了一种可能的通讯协议,实现灯的控制和对环境的感知, 以及一种消息解析器的设计.
如果你有一个路由器, 我们假设其Wi-Fi的SSID为 `MyRouter`, 密码为 `00000000`. 
#### 假设:
路由器IP为 `192.168.3.1`.  
NodeMCU的IP为 `192.168.3.2`.  
你的电脑的IP为 `192.168.3.3` .  
**PS**: 如果你没有一个路由器, 你可能需要先阅读树莓派相关教程的第一篇, 将你的树莓派变成一个Wi-Fi热点. 当然你也可以使用你的移动设备的Wi-Fi热点功能, 它本质上与路由器无异.
  
我们将采用简单的Socket通讯机制, 所有主流的编程语言都提供了Socket支持, 你可以在你的电脑端使用Python, Java, JavaScript等. 本文提供了Java语言的示例代码.
## 在你的电脑上部署简单的接收程序
以下代码监听10086端口, 将收到的任何数据以字符串的形式打印出来, 并且把相同内容的数据发送回去.  
该代码一旦启动, 就不会停止, 你可以放心的用它来调试你的NodeMCU, 盯紧控制台!
## Test.java
```Java
public Test{
    public static void main(String args[]) throws IOException {
        ServerSocket ss = new ServerSocket(10086);
        System.out.println("Server starting");
        while (true) {
            Socket socket = ss.accept();
            System.out.println("new device connected");
            new Thread(() -> {
                while(true){
                    try {
                        InputStream is = socket.getInputStream();
                        OutputStream os = socket.getOutputStream();
                        BufferedReader reader = new BufferedReader(new InputStreamReader(is));
                        byte buffer[] = new byte[1024];
                        int len;
                        while((len = is.read(buffer)) != -1){
                            System.out.println(new String(buffer,0,len));
                        }
                        os.write(buffer,0, len);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }).start();
        }
    }
}
```
## 使用NodeMCU进行Socket通信

**PS**: NodeMCU支持TCP和UDP两种协议通信, 详细文档请参阅[此处](http://nodemcu.readthedocs.io/en/dev/en/modules/net/).
下面是NodeMCU net模块的基本使用方法.
# 请发挥你自己的想象力, 结合计时器(Timer)等模块, 设计一个可以自动重连的程序.
## 基本用法
```Lua
socket = net.createConnection(net.TCP, 0) --创建TCP客户端
socket:connect(10086, '192.168.3.3')  --连接到电脑
sk:on("connection", function(sck, c)  --连接成功回调函数
    print('connected')              
    sck.send("hello")                 --发送'hello'字符串
end)
sk:on("receive", function(sck, message) 
    print(message)  --不管收到什么,打印
end)
```
运行这个脚本,你将会看到如下输出:
#### Java控制台

#### NodeMCU控制台

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