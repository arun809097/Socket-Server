const fs = require('fs');
const IO = require('socket.io-client');
const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

try {
    const socket = IO('wss://eventv4.urbet.in', {
        transports: ['websocket'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 99999,
        extraHeaders: {
            Origin: 'https://urbet.in' // Replace with your desired custom origin
        },
        // SSL/TLS options
        key: privateKey,
        cert: certificate 
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








 
