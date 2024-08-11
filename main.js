const http = require("http");
const express = require("express");
const app = express();
const fs = require('fs');

// Uncomment if using environment variables
// require("dotenv").config();

app.use(express.static("public"));

const IO = require('socket.io-client');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

const serverPort = process.env.PORT || 3000;
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server using the SSL certificate files and attach the Express app
const httpServer = http.createServer(credentials, app);

app.get('/', (req, res) => {
  

try {
    const socket = IO('ws://eventv4.urbet.in', {
      transports: ['websocket'],
      reconnection: false,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      extraHeaders: {
        Origin: 'http://urbet.in' // Replace with your desired custom origin
      }
    });
  
    socket.on('connect', () => {
    res.send('Connected to WebSocket');
      socket.emit('casino', 'abj');
    });
  
    socket.on('disconnect', () => {
    res.send('WebSocket connection closed');
    });
  
    socket.on('error', (error) => {
    res.send('WebSocket connection error:', error);
    });
  
    socket.on('connect_error', (error) => {
     res.send('Connection error:', error.message);
    });
  
  } catch (err) {
 res.send('Synchronous error caught:', err);
  }


  
});

const server = httpServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});
