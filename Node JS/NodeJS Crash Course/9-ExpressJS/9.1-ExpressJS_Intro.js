
/*
    ======================================
    🏃🏃🏃  ExpressJS Introduction 🏃🏃🏃
    ======================================

    We have learned that we can serve websites and files using just 'http' and 'fs' module
    by writing into them based on EventEmitter and FileSystems Streams.

    However it may be lengthy code if the project is large. ExpressJS is a web framework
    that helps you in avoiding to write lengthy code for backend! It makes creating web
    server much easier

    Make sure to have expressJS installed in NPM. 

    >   const app = express();                  //  Create an express application
    
    >   app.get( path, (req, res) => {          //  Handles GET requests to the path specified.
            ...
            res.send();
        });

    >   app.listen( port );                     //  Make the server listen to specified port number
*/


const express = require('express');
const app = express();

app.get('/', (req,res)=> {
    res.send(`<h1> Welcome to ${__dirname} </h1>`);
});

app.listen(3000);