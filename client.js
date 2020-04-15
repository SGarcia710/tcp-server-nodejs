const Net = require('net');
const port = 8080;
const host = 'localhost';

const client = new Net.Socket();
client.connect({ port: port, host: host }, function () {
  console.log('TCP connection established with the server.');
  const [key, value] = process.argv.slice(2);
  const object = { key, value };
  client.write(JSON.stringify(object));
});

client.on('data', function (chunk) {
  console.log(`Data received from the server: ${chunk.toString()}.`);

  client.end();
});

client.on('end', function () {
  console.log('Requested an end to the TCP connection');
});
