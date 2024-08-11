const express = require("express");
const app = express();
// const fs = require('fs'); // No need for SSL certificate files on Heroku
// require("dotenv").config();

const IO = require('socket.io-client');
app.use(express.static("public"));
 

const serverPort = process.env.PORT || 3003;

// Create an HTTP server (Heroku handles HTTPS)
app.get('/', (req, res) => {
    try {
        const socket = IO('ws://spusher.mv3xpro.in', {
          transports: ['websocket'],
          reconnection: false,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 99999,
          extraHeaders: {
            Origin: 'http://balaji12.co' // Replace with your desired custom origin
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
         res.send(error);
        });
      
      } catch (err) {
     res.send( err);
      }
    
    });
     

const server = app.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});
