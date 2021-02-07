
/*
    =============================
    🖥🖥🖥  HTTP Module 🖥🖥🖥
    =============================
    It's time to get to know about how to use NodeJS as a backend language!

    NodeJS comes with a 'http' module, which includes useful functions that will make your
    website hosting life easier. It helps us in set up as well as configure a http server

    >   To setup a HTTP server, we simply use

            const server = http.createServer( (req, res) => { ... } )  -   Creates a server instance.
                                                                           It returns the server instance
    
    >   To write something to the response body, note that it is a Writable Stream, therefore

            res.write(....);
            res.end();          //  Indicate the writing has ended

    >   Then, we need to mention what port the server will use

            server.listen('3000');          //  Now server will listen to port 3000!

    
    >   Response header is also important to be written. Status codes and parameters can be filled
        via

            res.writeHead( statusCode, {keyValues} );

    
    >   We might want to serve different contents with different url. Use:
                req.url    
        to obtain the requested url and compare it using if and equality === statements
        

    >   To parse the url string to obtain the query parameters, first import the module 'url'
        then use 
                url.parse(req.url, parseQueryString? ).query

        to obtain an Object having key value pairs of query string
    
*/



const http = require('http');
const url = require('url');
const fs = require('fs');

//  A simple website which simply greets the user. A query parameter 'name', if present, will be used
function exampleHttpModule() {

    http.createServer( (req, res)=> {
        const name = url.parse(req.url, true).query['name'] || 'Anonymous';

        res.write("Hello Nice to Meet You " + name);
        res.end();
    }).listen('3000');

}



function exampleHttpModule2() {

    http.createServer( (req,res)=> {
        const fileType = url.parse(req.url, true).query['file'] || 'html';
        let file;

        if (fileType === 'html') {
            res.writeHead(200, { 'Content-type': 'text/html'} );
            file = fs.createReadStream('./NodeJS Crash Course/7-Http Module/index.html');
        }
        else if (fileType === 'json') { 
            res.writeHead(200, { 'Content-type': 'application/json' } );
            file = fs.createReadStream('./NodeJS Crash Course/7-Http Module/example.json');
        }
        else {
            res.writeHead(200, { 'Content-type': 'image/png' } );
            file = fs.createReadStream('./NodeJS Crash Course/7-Http Module/picture.png');
        }

        file.pipe(res);

    }).listen('3000', ()=> {
        console.log("Web server started at port 3000");
    });

}


exampleHttpModule2();