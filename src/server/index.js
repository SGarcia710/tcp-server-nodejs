const { Server } = require('net');

class TCPServer extends Server {
  constructor(port) {
    super();
    this.port = port || 8080;

    this.startListening();
  }

  startListening() {
    super.listen(this.port, () => {
      console.info(
        `Server listening for connection requests on socket localhost:${this.port}`
      );
    });

    super.on('connection', (socket) => {
      socket.setEncoding('utf-8');
      socket.setTimeout(1000);

      socket.on('data', (chunk) => {
        // Here we have the data from the client
        console.log(`Data received from client: ${chunk.toString()}`);
        socket.end();
      });
      // Response to the client
      socket.write('We got ya!');

      socket.on('error', (err) => {
        console.log(`Error: ${err}`);
      });
    });
  }
}

module.exports = TCPServer;
