const IO = require('socket.io-client');
const fs = require('fs');
const https = require('https');
const socket = require('socket.io');
// Read the SSL certificate files
const privateKey = fs.readFileSync('./private.key', 'utf8');
const certificate = fs.readFileSync('./certificate.cert', 'utf8');

// Create HTTPS server using the SSL certificate files
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials);
 
 
const port = 9792;
 

const ConnectBase=(_io,_type,_id)=>{
    
    const socket = IO('wss://spusher.jpl99.in', {transports: [ 'websocket' ], reconnection: true,
reconnectionDelay: 1000,
reconnectionDelayMax : 5000,
reconnectionAttempts: 99999,
  extraHeaders: {
    Origin: 'https://balaji12.co' // Replace with your desired custom origin
  }
});

socket.on('connect', () => {
 console.log('connected...');
  socket.emit(_type,  _id);

});
  
socket.on('alwarevents/'+_id, (data) => {
    _io.emit('gems/'+_id, data);
  const market_id= JSON.parse(data).market_id;
    socket.emit('bm_odds', market_id);
    
    socket.emit('auto_fancy', market_id);
});

 socket.on('casino/'+_id, (data) => {
  _io.emit('gems/'+_id, data);
  
    });

   
socket.on('bm_odds',(...data) => {
  
  _io.emit('bm_odds', data);

});
   
socket.on('autofancy',(...data) => {
  
  _io.emit('autofancy', data);

});
   
    
    
  

socket.on('disconnect', () => {
  console.log('WebSocket connection closed');
});

    
}

// Start the Express server
const server = httpsServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Create an instance of Socket.IO and listen on the server
const io = socketIO(httpsServer);

// Handle Socket.IO connection
io.on('connection', (_io) => {
  console.log('A client connected.');
 
   _io.on('casino',(ID) => {
    
  ConnectBase(_io,'casino',ID);
  
  //  ConnectBase(_socket,event.replace('gems','alwarevents'),args);
 
  //  socket.emit(event.replace('gems','alwarevents'), args);
 
   });
  _io.on('gems',(ID) => {
   
  ConnectBase(_io,'alwarevents',ID);
  
  //  ConnectBase(_socket,event.replace('gems','alwarevents'),args);
 
  //  socket.emit(event.replace('gems','alwarevents'), args);
 
   });
  
  // Handle the 'disconnect' event
 // socket.on('disconnect', () => {
  //  console.log('A client disconnected.');
  //});
});
 
 
