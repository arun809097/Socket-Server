const https = require("https");
const express = require("express");
const app = express();
const fs = require('fs');
app.use(express.static("public"));
// require("dotenv").config();

const IO = require('socket.io-client');

const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

const serverPort = process.env.PORT || 3000;
// Create HTTPS server using the SSL certificate files
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials);
 

   



app.get('/', (req, res) => {
    res.send('Hello World!');
});



const server = httpsServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
  });
  
