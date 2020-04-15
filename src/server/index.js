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
      socket.on('data', (chunk) => {
        console.log(`Data received from client: ${chunk.toString()}`);
      });

      socket.write('We got ya!');

      socket.on('error', (err) => {
        console.log(`Error: ${err}`);
      });
    });
  }
}

module.exports = TCPServer;
