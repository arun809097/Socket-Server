const IO = require('socket.io-client');
const socketIO = require('socket.io');

// Start the server without HTTPS if using Heroku’s built-in SSL management
const port = 9792;

const ConnectBase = (_io, _type, _id) => {
  const socket = IO('wss://spusher.jpl99.in', {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999,
    extraHeaders: {
      Origin: 'https://balaji12.co' // Replace with your desired custom origin
    }
  });

  // Your WebSocket handling code...
};

// Start the server
const server = require('http').createServer();
const io = socketIO(server);

io.on('connection', (_io) => {
  console.log('A client connected.');

  _io.on('casino', (ID) => {
    ConnectBase(_io, 'casino', ID);
  });

  _io.on('gems', (ID) => {
    ConnectBase(_io, 'alwarevents', ID);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
