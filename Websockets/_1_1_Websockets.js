
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API#guides

/* =========================================
    🔌 1.1 - Pure, pure Websockets 🔌
   =========================================

    Here, we'll be implementing a basic websocket using built in nodejs server. No express.

    Note that websocket is external dependency. We need to install it first

        npm i websocket
*/  
const http = require('http');

// Note unrelated to websocket:
// Using nodejs http library, we have to manually parse the req.url ourselves and decide what route it has taken.
// This is abstracted away in express.
const app = http.createServer((req,res)=> {
    console.log("Request received");
});

app.listen('3000', ()=> {
    console.log("Server started on port 3000");
});


//================================================
// Websocket part here
//================================================
const websocket = require('websocket');
const WebSocketServerClass = websocket.server;       // Note it is a class, we need to use 'new'
let connection = null;                                     // The current ongoing connection of websocket. If we have multiple clients, we should use array to store multiple connections

const webSocketServer = new WebSocketServerClass({
    httpServer: app                                     // The HTTP server used for the initial handshake. Remember all about 'UPGRADE' request?
});


// A Request to establish a websocket connection with our server
webSocketServer.on('request', (request)=> {
    connection = request.accept(null, request.origin);       // The accepted protocol, and the accepted origin
    console.log("Opened connection coming from " + request.origin)
    
    connection.on('close', ()=> console.log("Connection with " + request.origin + " is closed."));
    connection.on('message', (msg)=> console.log("Message: " + msg.utf8Data));
});


/*  =========================================================================================================
    From here onwards, you may want to create a websocket client to connect with the server you just created.
    Luckily, websocket is already came ready with most browsers.
    
    This means we can go straight into, say Chrome, and pop up the console and type

            const socket = new WebSocket('ws://localhost:3000');

    Upon typing this into your console, you should see your server is connected immediately. Neat!
    Don't forget to add event listeners to your client side websocket if you want server interaction.
    
    (If you are in VSCode, you may use Debug Console for sending messages to client side. Note that debug process
    need to be paused first)
*/