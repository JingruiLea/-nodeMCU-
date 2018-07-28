# bus.js 与 LampServer.js 的使用

首先感谢14组同学为我提出的宝贵修改意见.
----

## 1.更新代码
用`VS Code`(以下简称`Code`)打开**后台**(NodeMCULightBackground)文件夹, **在另外的文档中保存你认为重要的修改**.本操作将会是你的代码与Git仓库完全相同.打开`Code`的控制台, 输入.
```Bash
git stash
git pull
```
如果你不放心, 可以与git上的代码对比, 看是否一样.
> PS : 学习Git, git stash, git pull 的使用, 以备不时之需.
## 2.LampServer.js
`LampServer.js`代表灯泡服务器, `webs`变量代表你所有打开的网页.  
通过如下代码, 即可向网页发送消息.
```JavaScript
webs.bo
```
