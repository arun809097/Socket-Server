const http = require("http");
const express = require("express");
const app = express();

// Uncomment if using environment variables
// require("dotenv").config();

app.use(express.static("public"));

const IO = require('socket.io-client');


const serverPort = process.env.PORT || 3000;

// Create HTTPS server using the SSL certificate files and attach the Express app
const httpServer = http.createServer( app);

app.get('/', (req, res) => {
  

try {
    const socket = IO('wss://eventv4.urbet.in', {
      transports: ['websocket'],
      reconnection: false,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      extraHeaders: {
        Origin: 'https://urbet.in' // Replace with your desired custom origin
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
    res.send(error);
    });
  
    socket.on('connect_error', (error) => {
     res.send(error.message);
    });
  
  } catch (err) {
 res.send( err);
  }


  
});

const server = httpServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});
