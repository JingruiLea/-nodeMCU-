## 读取GY30数据 按钮控制LED亮度
本文将实现使用NodeMCU读取GY30传感器的值  
并且加入三个物理按钮, 用按钮控制LED的颜色

# 读取GY30
## 先修知识

### I2C总线协议:
I2C总线是由Philips公司开发的一种简单、双向二线制同步串行总线。它只需要两根线即可在连接于总线上的器件之间传送信息。
### NodeMCU使用I2C
详情参见[官网](http://nodemcu.readthedocs.io/en/dev/en/modules/i2c/)
### GY30相关信息
GY30的光感芯片用的是BH1750  
[BH1750-GY30使用说明](https://wenku.baidu.com/view/4425da33f7ec4afe05a1df64.html)  
### 注意点
+ addr拉低时，GY30 I2C地址为0x23
+ addr拉高时，GY30 I2C地址为0x5c
+ 需要发送**0x01**进行初始化

## 电路连接
按照下面电路图连接好实验电路:  
假装有图
## 代码实现(addr拉低)
测量模式(`mode`)可选:  
高分辨率模式: 0x20  (推荐)  
更高分辨率模式: 0x21  
低分辨率模式: 0x23  
```Lua
--初始化
function initGY30(sda ,scl)
     i2c.setup(0, sda, scl, i2c.SLOW)    
end

function readGY30(mode, func)
--mode是测量模式参数，func是测量完成后的回调函数
--因为测量需要时间，所以要写成异步式代码
     i2c.start(0)
     i2c.address(0, 0x23, i2c.TRANSMITTER)
     i2c.write(0, 0x01)
     i2c.stop(0)
     --上面四句话是发送0x01，模块上电，准备测量。
     i2c.start(0)
     i2c.address(0, 0x23, i2c.TRANSMITTER)
     i2c.write(0, mode)
     i2c.stop(0)
     --这四句代码的是输入测量模式，mode是函数参数
     tmr.alarm(2, 129, tmr.ALARM_SINGLE, function()
         --启动一个延时器，129毫秒后读取，sda线上的数据。
         --下面四句话是读取的过程
         --之所以取129毫秒，是因为测量最长需要120毫秒
       i2c.start(0)
       i2c.address(0, 0x23, i2c.RECEIVER)
       local c = i2c.read(0, 2)
       --读出两个Byte的数据"local c"是string类型
       i2c.stop(0)
       if string.byte(c,1)~=0 then
       --如果前一个字节不为零，也就是当前环境亮度大于255lx
       --string.byte(c,n) 把c的第n个字符换为十进制整数
       --把第一个字节左移8位也就是×256，加上第二个字节
           local lx=string.byte(c, 1)*256+string.byte(c, 2)
           func(lx)--回调
       else
       --如果前一个字节为零，也就是当前环境亮度小于255lx
           local lx=string.byte(c, 2)
           func(lx)--回调
       end
     end)
end
```
使用:
```Lua
initGY30(5,6)

tmr.alarm(6,500,tmr.ALARM_AUTO,function()
     readGY30(0x20,function(lx)
         --回调函数具体执行的内容，这里是打印出来
         print('lx:'..lx)
     end) 
end)
```
控制台输出:
![假装有图](/a.jpg)
# 按钮控制LED亮度

## 先修知识
### 按键抖动
通常的按键所用开关为机械弹性开关，当机械触点断开、闭合时，由于机械触点的弹性作用，一个按键开关在闭合时不会马上稳定地接通，在断开时也不会一下子断开。

### 下拉电阻
下拉电阻的主要作用是与上接电阻一起在电路驱动器关闭时给线路（节点）以一个固定的电平。

本功能较为简单, 留给读者自己实现, 在这里同展示两种可能的设计方案.

## 方案一
采用三个按钮, 当按键按下时, NodeMCU线性调整对应颜色灯泡的亮度. 即: 长按调整亮度.

## 方案二
采用三个按钮, 每个颜色设置5个挡位, 当按钮按下时, NodeMCU按顺序切换挡位, 调整灯泡亮度.

相关文章: [NodeMCU(ESP8266) - 设置按键中断时遇到的坑](https://zhuanlan.zhihu.com/p/35097181)

没勾选pwm,没插入nodemcu,没插好针脚.