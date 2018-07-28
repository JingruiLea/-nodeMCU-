const net = require('net');
const client = net.createConnection({ port: 10086 }, () => {
  //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
});
client.on('end', () => {
  console.log('disconnected from server');
});