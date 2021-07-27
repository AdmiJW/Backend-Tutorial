
/*
   =========================================
    🔌 1.2 - Socket.IO 🔌
   =========================================

    To install, use 
            npm i socket.io

    At the client side, this library is also needed. You can include a script tag linking to its CDN

    Socket.io is a library that is used both on server side and client side to establish bidirectional, low latency
    connections. By default, it tries to establish websocket connection, but provides fallback to long polling for
    compatibility.

    Using Socket.io, we can emit any events we want (freedom of naming events), which uses the concept of EventEmitter in
    NodeJS.
*/

const socketio = require('socket.io');
const express = require('express');
const path = require('path');

const SocketIOServerClass = socketio.Server;         // This is a class, and we need to pass it our HTTP server

const app = express();

// Serve static files
app.use('/public', express.static( path.join(__dirname, 'public') ));

app.get('/', (req,res)=> {
    res.sendFile( path.join(__dirname, 'public', 'index_1.html') );
});


// You may have not noticed yet, but app.listen() actually returns http.Server() instance, which is required by socketIO!
//
// Implicitly, when you call app.listen(), express creates a http.Server instance. 
// Alternatively, we could create our own server by http.createServer(), pass in our app and use server.listen() instead
//
//      const app = express();
//      const server = http.createServer(app);
//      server.listen(3000);
//
const httpServer = app.listen(3000, ()=> {
    console.log("Web server started on port 3000");
});



//=========================================
// SocketIO action here
//=========================================
const io = new SocketIOServerClass(httpServer);         // You may not use 'new' keyword. Acceptable

// Event listener when a client socket connects
io.on('connect', (socket)=> {
    console.log("A User has connected with socketID: " + socket.id);


    // Add event listeners to the clientSocket
    socket.on('disconnecting', (reason)=> {
        console.log("User " + socket.id + " is disconnecting.... Reason: " + reason);
    });

    socket.on('message-server', (msg)=> {
        console.log(`User ${socket.id} messaged to server: ${msg}`);
    });

    socket.on('broadcast', (msg)=> {
        // Use socket.broadcast.emit(...) to broadcast to all connected sockets, except the one socket specified
        console.log(`User ${socket.id} broadcasted: ${msg}`);
        socket.broadcast.emit('message', `${socket.id}: ${msg}`);   
    });

    socket.on('ping', (msg)=> {
        socket.emit('message', `Pong ${msg}`);
    });
});
