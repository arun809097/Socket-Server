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
    res.send('Hello World!');
});

const server = httpServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
});
