
/*
    =======================================
    📫📫📫 Handling POST requests 📫📫📫
    =======================================

    At some point, we must be able to handle POST requests from the client. In most cases, POST
    requests come from HTML forms. 

    To be able to parse the body of the HTTP POST request, we need external module called
    'body-parser'. Install that into node modules first, and require it into our project.

    Then, we have to apply that as a middleware. Same thing, use:

        app.use( bodyParser.urlencoded( {extended: false/true } ) )

    The extended option, if true, will tell the body-parser module to use 'qs' library to parse
    URL-Encoded data for support of Objects and Arrays.

    After the middleware is applied, simply apply the post method:

        app.post('/', (req,res)=> {
            console.log(req.body);         //  Now we have the body JSON object in the request object
            res.send(...);
        });
*/

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');


function examplePOSTRequest() {

    //  Set up static serving file (In this case just for index.html)
    app.use( '/', express.static(path.join(__dirname, 'static') ) );

    //  Serve the Form HTML on get request
    app.get('/form', (req,res)=> {
        res.sendFile( path.join(__dirname, 'static', 'form.html') );
    });


    //  Serve urlencoded form URLs (Put it in a specialized url for efficiency)
    app.use('/', bodyParser.urlencoded( {extended: true}) );

    //  Respond to the POST requests. Remmeber that the URL must match the 'action' attribute in the HTML form
    app.post('/', (req,res)=> {
        const { email, password } = req.body;       //  Use req.body to get the POST request body
        console.log(email, password);
        res.send("Successfully registered: " + email + " " + password);
    });
}

examplePOSTRequest();

app.listen(3000, ()=> {
    console.log('Server set up at 3000');
});



