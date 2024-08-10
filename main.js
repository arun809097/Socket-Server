const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("public"));
const WebSocket1 = require('ws');

 
const ws = new WebSocket1('wss://circle-data.yply.xyz:3031/socket.io/?EIO=4&transport=websocket');
ws.on('open', () => {
    console.log('Connected to WebSocket');
});
 

ws.on('close', () => {
    console.log('WebSocket connection closed');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});
const serverPort = process.env.PORT || 3002;
const server = http.createServer(app);
const WebSocket = require("ws");

let keepAliveId;

const wss =
  process.env.NODE_ENV === "production"
    ? new WebSocket.Server({ server })
    : new WebSocket.Server({ port: 5001 });

server.listen(serverPort);
console.log(`Server started on port ${serverPort} in stage ${process.env.NODE_ENV}`);

wss.on("connection", function (ws, req) {
  console.log("Connection Opened");
  console.log("Client size: ", wss.clients.size);

  if (wss.clients.size === 1) {
    console.log("first connection. starting keepalive");
    keepServerAlive();
  }
 
    
  ws.on("message", (data) => {
    let stringifiedData = data.toString();
    if (stringifiedData === 'pong') {
      console.log('keepAlive');
      return;
    }  
   ws.on('message', (data) => {
    if (Buffer.isBuffer(data)) {
        // Convert binary data to a UTF-8 string
        const utf8String = data.toString('utf8');
      console.log('Received UTF-8 message from binary data:', utf8String);
   
    broadcast(ws, utf8String, false);
    } else if (typeof data === 'string') {
        // Handle text data directly
        console.log('Received UTF-8 message:', data);
    }
});
   
  });

  ws.on("close", (data) => {
    console.log("closing connection");

    if (wss.clients.size === 0) {
      console.log("last client disconnected, stopping keepAlive interval");
      clearInterval(keepAliveId);
    }
  });
});

// Implement broadcast function because of ws doesn't have it
const broadcast = (ws, message, includeSelf) => {
  if (includeSelf) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  } else {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};

/**
 * Sends a ping message to all connected clients every 50 seconds
 */
 const keepServerAlive = () => {
  keepAliveId = setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('ping');
      }
    });
  }, 50000);
};


app.get('/', (req, res) => {
    res.send('Hello World!');
});
