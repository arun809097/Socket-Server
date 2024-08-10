const http = require("http");
const express = require("express");
const socketIO = require('socket.io');
const app = express();

app.use(express.static("public"));

const serverPort = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

server.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort} in stage ${process.env.NODE_ENV}`);
});

let keepAliveId;

io.on("connection", (socket) => {
    console.log("Connection Opened");
    console.log("Client size: ", io.sockets.sockets.size);

    if (io.sockets.sockets.size === 1) {
        console.log("First connection. Starting keepalive");
        keepServerAlive();
    }

    socket.on("message", (data) => {
        let stringifiedData = data.toString();
        if (stringifiedData === 'pong') {
            console.log('keepAlive');
            return;
        }
        broadcast(socket, stringifiedData, false);
    });

    socket.on("disconnect", () => {
        console.log("Closing connection");

        if (io.sockets.sockets.size === 0) {
            console.log("Last client disconnected, stopping keepAlive interval");
            clearInterval(keepAliveId);
        }
    });
});

// Implement broadcast function
const broadcast = (socket, message, includeSelf) => {
    if (includeSelf) {
        socket.broadcast.emit('message', message);
    } else {
        socket.broadcast.emit('message', message);
    }
};

/**
 * Sends a ping message to all connected clients every 50 seconds
 */
const keepServerAlive = () => {
    keepAliveId = setInterval(() => {
        io.sockets.emit('ping');
    }, 50000);
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});
