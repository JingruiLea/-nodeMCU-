# 边缘计算实验1-初识树莓派

实验目标-实验步骤-学习资料-课后思考-参考文献
## 树莓派不需要显示器用笔记本直连的方法请注意以下几点
1.在烧录系统时新建ssh.txt文件来手动开启ssh服务（现在的树莓派ssh服务默认是关闭的）

2.在烧录系统时配置好wifi的账号和密码（手机开热点，不能使用neu，同时电脑也要连同一个wifi保证同一网段）

3.使用网线连接电脑来查看树莓派的ip地址

4.在笔记本上下载vncviewer来连接树莓派，树莓派的vnc是默认开启的

## 一 实验目标
Step1.烧录树莓派系统到SD卡上，将sd卡插到树莓派上，登陆系统

Step2.学习linux命令，尝试使用linux系统

Step3.学习树莓派引脚功能以及python的Gpio库

Step4.连接电路，运行python的点亮led灯程序

## 二 实验步骤

Step1.烧录树莓派系统到SD卡上

1.1需要准备的硬件

PC 1台

台式机笔记本都可以，需要联网用于下载软件，需要有一个TF卡读卡器，用于读写TF卡。如果没有，可以外接1个USB读卡器。

PC操作系统也是随意的，当然我这里以使用最广泛的Windows为例（XP、7、8、10应该都可以，我使用的是Windows 7）。

树莓派 1个

各版本的树莓派安装系统过程和基本操作都差不多，这里当然以Raspberry Pi 3 Model B为例。

TF卡1张

TF卡就是Micro SD卡，就是能插卡扩展容量的手机上用的那种。容量上8GB就够，当然大一点好，另外速度也要考虑，建议买速度快一点，质量好一点的卡，毕竟这相当于Raspberry Pi的系统盘。

电源1个

电源接口是Micro USB，但并不是所有的手机充电器都能用。官方要求是5V 2A。

显示器1台

树莓派上有标准尺寸的HDMI接口，稍微新一点的显示器和电视机上都有此接口，用HDMI线插上就行了。遇到老式显示器仅支持VGA输入的情况，还需要一个HDMI转VGA转接线。

键盘鼠标

1.2 需要准备的软件

Raspbian镜像

官方下载地址：https://www.raspberrypi.org/downloads/raspbian/



选择左边的版本，（右边的LITE是精简版）。点击download ZIP下载就可以了。



镜像写入工具

Win32 DiskImager 0.9.5

下载地址：

http://nchc.dl.sourceforge.net/project/win32diskimager/Archive/Win32DiskImager-0.9.5-install.exe

注：以上是Windows下的镜像写入工具，如果你使用Linux，看这篇：

https://www.raspberrypi.org/documentation/installation/installing-images/linux.md

如果你使用Mac OS，看这篇：

https://www.raspberrypi.org/documentation/installation/installing-images/mac.md




1.3烧写系统

1、首先安装Win32 DiskImager，直接双击下载的安装包Win32DiskImager-0.9.5-install.exe就可以了。基本上一路next下去就装好了，桌面上会有Win32DiskImager的软件图标。

2、解压缩raspbian压缩包得到raspbian-jessie.img文件（注意解压缩后的文件有4G多，磁盘空间一定要够）。

3、把TF卡插入读卡器后连接电脑，PC会识别出这张卡，并有一个盘符。 





可以看到我这里是J盘，注意你看到的可能和我不同，请记下你的盘符。

3、打开Win32 DiskImager，界面如下。
 


点击Image File下面一行右边的蓝色图标，选择镜像。这里选择上一步解压缩得到的系统。

点击Device下面一行的盘符列表，选择TF卡的盘符，我这里是[J:\]

4、点击下方的Write按钮，准备写入镜像。软件弹出确认对话框。






5、再次确认选的盘符（如J盘）确实是TF卡的盘符，且里面的数据都已经不再需要。点击刚才确认对话框里的“Yes”按钮，正式开始写入。



Step2.学习linux命令，尝试使用linux系统


1.1linux常用命令（建议仔细看姜侃老师发的ppt）

1、cd命令

-------用于切换当前目录，参数是要切换到的目录的路径，可以是绝对路径，也可以是相对路径。如

cd /root/Docements # 切换到目录/root/Docements  

cd ./path          # 切换到当前目录下的path目录中，“.”表示当前目录    

cd ../path         # 切换到上层目录中的path目录中，“..”表示上一层目录  

2、ls命令

------查看文件与目录的命令，参数如下：


-l ：列出长数据串，包含文件的属性与权限数据等  

-a ：列出全部的文件，连同隐藏文件（开头为.的文件）一起列出来（常用）  

-d ：仅列出目录本身，而不是列出目录的文件数据  

-h ：将文件容量以较易读的方式（GB，kB等）列出来  

-R ：连同子目录的内容一起列出（递归列出），等于该目录下的所有文件都会显示出来  

注：这些参数也可组合使用，如：

3、cp命令

------用于复制文件，copy之意，它还可以把多个文件一次性地复制到一个目录下，它的常用参数如下

-a ：将文件的特性一起复制  

-p ：连同文件的属性一起复制，而非使用默认方式，与-a相似，常用于备份  

台式机笔记本都可以，需要联网用于下载软件，需要有一个TF卡读卡器，用于读写TF卡。如果没有，可以外接1个USB读

台式机笔记本都可以，需要联网用于下载软件，需要有一个TF卡读卡器，用于读写TF卡。如果没有，可以外接1个USB读卡器。


-i ：若目标文件已经存在时，在覆盖时会先询问操作的进行  

-r ：递归持续复制，用于目录的复制行为  

-u ：目标文件与源文件有差异时才会复制  



如：

cp -a file1 file2 #连同文件的所有特性把文件file1复制成文件file2  

cp file1 file2 file3 dir #把文件file1、file2、file3复制到目录dir中  

4、mv命令

-------用于移动文件、目录或更名，move之意，常用参数如下：

-f ：force强制的意思，如果目标文件已经存在，不会询问而直接覆盖  

-i ：若目标文件已经存在，就会询问是否覆盖  

-u ：若目标文件已经存在，且比目标文件新，才会更新  

注：该命令可以把一个文件或多个文件一次移动一个文件夹中，但是最后一个目标文件一定要是“目录”。

如：

mv file1 file2 file3 dir # 把文件file1、file2、file3移动到目录dir中  

mv file1 file2 # 把文件file1重命名为file2  

5、rm命令

------用于删除文件或目录，remove之间，它的常用参数如下：

-f ：就是force的意思，忽略不存在的文件，不会出现警告消息  

-i ：互动模式，在删除前会询问用户是否操作  

-r ：递归删除，最常用于目录删除，它是一个非常危险的参数  

如：

rm -i file # 删除文件file，在删除之前会询问是否进行该操作  

rm -fr dir # 强制删除目录dir中的所有文件  

6、cat命令

------用于查看文本文件的内容，后接文件名，通常可用管道与more和less一起使用，从而可以一页页地查看数据。例如：

cat text | less # 查看text文件中的内容  

# 注：这条命令也可以使用less text来代替  



7、vim命令

———用于文本编辑，它接一个或多个文件名作为参数，如果文件存在就打开，如果文件不存在就以该文件名创建一个文件。

Step3 学习树莓派引脚功能以及python的Rpi库



Step4 连接电路并运行python程序

下面是shell

sudo apt-get upgrade #更新

sudo apt-get update #更新

sudo apt-get install python3

sudo apt-get install python-dev 

sudo apt-get install python-rpi.gpio 

sudo apt-get install python-serial

cd Desktop   #进入桌面文件夹

more led.txt  #只读给出的led程序

mv led.py   #重命名文件后缀 

python led.py  #运行python程序

sudo poweroff  #关机

下面是程序

import RPi.GPIO as GPIO   #导入树莓派提供的python模块

import time   #导入时间包，用于控制闪烁

GPIO.setmode(GPIO.BCM)   #设置GPIO模式，BCM模式在所有数码派通用


GPIO.setup(18, GPIO.OUT)   #设置GPIO18为电流输出

while True:

    GPIO.output(18, GPIO.HIGH)   #GPIO18 输出3.3V

    time.sleep(0.05)   #程序控制流程睡眠0.05秒

    GPIO.output(18, GPIO.LOW)    #GPIO18 输出0V

    time.sleep(0.05)   #程序控制流程睡眠0.05秒

## 三 学习资料

1.python基础：

（1）廖雪峰python3教程：https://www.liaoxuefeng.com

（2）实验楼python3实验：https://www.shiyanlou.com/courses/596

2.树莓派基础：

（1） 树莓派python编程指南.pdf

（2） 树莓派python编程入门与实战.pdf

（3） 树莓派官方文档python部分

https://www.raspberrypi.org/documentation/usage/python/README.md

（4） 树莓派的pythonGPIO编程整理


https://blog.csdn.net/qq_35893742/article/details/53463798

3.linux基础：

（1） vim常见操作.jpg

（2） the linux command line中文版

http://billie66.github.io/TLCL/book/chap08.html

## 四 课后思考

1.树莓派引脚有两种编码方式（BCM和Board），尝试不改变电路连接的情况下改变编码方式实现功能

2.尝试不同的库来完成点亮小灯泡的功能

https://www.raspberrypi.org/documentation/usage/gpio/python/README.md

3.姜老师上次课按钮小灯github

https://github.com/androidthings/sample-button



## 五 参考文献

1.一起玩树莓派3+手把手带您入门树莓派（3000字+超详细图解版）

http://bbs.eeworld.com.cn/thread-503614-1-1.html?_t=t

2.Linux必会的几个基本命令

https://blog.csdn.net/weixin_39309402/article/details/79048361

3.树莓派官网文档

https://www.raspberrypi.org/documentation/

