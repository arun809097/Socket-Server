const https = require("https");
const fs = require('fs');
const express = require("express");
const app = express();
app.use(express.static("public"));
// require("dotenv").config();

const IO = require('socket.io-client');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

const serverPort = process.env.PORT || 3000;
// Create HTTPS server using the SSL certificate files
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials);
 
const server = httpsServer.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  

   

try {
    const socket = IO('wss://eventv4.urbet.in', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999,
      extraHeaders: {
        Origin: 'https://urbet.in' // Replace with your desired custom origin
      }
    });
  
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
      socket.emit('casino', 'abj');
    });
  
    socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });
  
    socket.on('error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error.message);
    });
  
  } catch (err) {
    console.error('Synchronous error caught:', err);
  }



app.get('/', (req, res) => {
    res.send('Hello World!');
});
