// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ioClient = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Replace with your WebSocket server URL
const websocketServerUrl = 'ws://spusher.mv3xpro.in';
const websocketClient = ioClient(websocketServerUrl, {
         path: '/socket.io',          
         transports: ['websocket'], 
         rejectUnauthorized: false,
          reconnection: false,
           reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 99999,
          extraHeaders: {
            Origin: 'http://balaji12.co' // Replace with your desired custom origin
          }
        });

// Handle WebSocket server events
websocketClient.on('connect', () => {
  console.log('Connected to WebSocket server');
});

websocketClient.on('message', (data) => {
  console.log('Received message from WebSocket server:', data);
  // You might want to broadcast this message to all connected clients
  io.emit('message', data);
});
websocketClient.onAny((event, data) => {
    console.log(`Received event from urbet "${event}":` );
    // Forward the event and data to the WebSocket server
    io.emit(event, data);
  }); 
 

websocketClient.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// Handle client connections to your Node.js server
io.on('connection', (socket) => {
  console.log('A client connected');

   
 socket.on('casino', (data) => {
    console.log('Received message from client:', data);
    // Forward the message to the WebSocket server
    websocketClient.emit('casino', data);
  });
  
  websocketClient.onAny((event, data) => {
    console.log(`Received event from urbet "${event}":` );
    // Forward the event and data to the WebSocket server
    io.emit('casino', data);
  });
 
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 3003;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
