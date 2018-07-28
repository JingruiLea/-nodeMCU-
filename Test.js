var net = require('net')
var PORT = 10086
var HOST = '0.0.0.0'
var nodemcu,android
net.createServer(function (socket) {
    nodemcu = socket

    console.log('CONNECTED: ' +
        socket.remoteAddress + ':' + socket.remotePort)

    socket.on('data', function (data) {
        console.log(data.toString()) //打印所有数据到控制台
    });

    socket.on('close', function (data) {
        console.log('CLOSED: ' +
            socket.remoteAddress + ' ' + socket.remotePort)
    });

}).listen(PORT, HOST);
console.log('服务器开始监听10086端口!')
