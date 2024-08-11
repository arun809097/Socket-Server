const https = require("https");
const fs = require('fs');
const express = require("express");
const IO = require('socket.io-client');
const app = express();

// Uncomment if using environment variables
// require("dotenv").config();

app.use(express.static("public"));

const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

const serverPort = process.env.PORT || 3000;
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server and attach the Express app
const httpsServer = https.createServer(credentials, app);

// Start the server
httpsServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});

// WebSocket connection
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

// Root route
app.get('/', (req, res) => {
    console.log('Root directory accessed');
    res.send('Hello World!');
});

app.use((req, res, next) => {
    console.log(`Received request for ${req.url}`);
    next();
});
