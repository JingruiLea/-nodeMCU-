#关于ESPlorer在Windows 10 & OpenJDK 9/10 环境下崩溃的问题

ESPlorer是比较好用的nodeMCU的IDE,但是在Win10(x64).OpenJDK9或10下打开串口就会崩溃,JVM错入报告如下:
```text
#
# A fatal error has been detected by the Java Runtime Environment:
#
#  EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x000000007110b5db, pid=30124, tid=14772
#
# JRE version: Java(TM) SE Runtime Environment (10.0+46) (build 10+46)
# Java VM: Java HotSpot(TM) 64-Bit Server VM (10+46, mixed mode, tiered, compressed oops, g1 gc, windows-amd64)
# Problematic frame:
# C  [jSSC-2.8_x86_64.dll+0xb5db]
#
# No core dump will be written. Minidumps are not enabled by default on client versions of Windows
#
# If you would like to submit a bug report, please visit:
#   http://bugreport.java.com/bugreport/crash.jsp
# The crash happened outside the Java Virtual Machine in native code.
# See problematic frame for where to report the bug.
#
```

该内存权限错误是因为ESPlorer引用了jscc(java-simple-serial-connector)这个库进行串口通信,而这个库的代码是由cygwin编译的,而jvm与cygwin的兼容性异常.

在此提供3种解决方案:  
1. 回滚jdk版本,使用jdk1.8.  
优点:操作简单  
缺点:电脑中有两个jdk版本,不适用于强迫症患者.  

2. 使用`Visual Studio`编译本机适用的`dll`文件.  
优点: 在装有vs的电脑上操作简单.  
缺点: 在未装vs的电脑上操作复杂.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编译的dll文件只适用于本机,**卸载VS后不能使用**.

3. 使用mingw64编译dll文件.  
优点: 在装有mingw64的电脑上操作简单.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dll适用多机器.  
缺点:在未装mingw64的电脑上操作**非常**复杂.

首先, 给读者提供编译好的dll文件.  
链接: https://pan.baidu.com/s/1BMv60EJWPkL6jW4vzAK-Mw   
密码: gxs2

把下载好的文件拷贝到`C:\\User\你自己的用户名\.jssc\windows\`下,我也没试过别人能不能用,祝你好运!  


下面是VS编译的教程:
先空着...  
下面是mingw64编译的教程:
先空着...  
因为实在是太麻烦了摔!