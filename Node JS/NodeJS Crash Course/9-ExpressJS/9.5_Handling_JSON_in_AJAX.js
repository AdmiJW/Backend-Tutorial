
/*
    ===============================================
    ⏲⏲⏲ 9.5 Handling JSON POST in AJAX ⏲⏲⏲
    ===============================================

    Previously, we have seen one way of submitting data to the server: By defualt posting
    of the HTML form element. 

    Modern websites may implement AJAX posting method instead - No need to refresh the web
    page, and the page is updated automatically. How nice is that?

    To achieve this, more work has to be done on the client side - Javascript AJAX requests.
    >   First, prevent HTML's form default submitting behavior
    >   Then, perform a AJAX request to the server, with corresponding header informations:
            -   Put the correct URL which nodeJS is set up to respond
            -   method used is POST
            -   content type is typically application/json
            -   send the data in JSON format
            -   put a callback function once the AJAX request is successfully responded


    Above all this is done in static/ajaxexample.html. Refer there for Javascript code
*/




/*
    Back to the server side, Handling AJAX request is made easy using Express and Body-Parser
    module.

    First, use body-parser's json() method as a middleware

    >       app.use( bodyParser.json() );

    Then, handle it in the post() method of the express app. The req.body is already a valid JSON
    format due to the middleware at work
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


//  /json is a URL i specialized, not mandatory
app.use('/json', bodyParser.json() );
app.use('/', express.static( path.join(__dirname, 'static') ) );

app.get('/json', (req,res)=> {
    res.sendFile( path.join(__dirname, 'static', 'ajax.html') );
});

app.post('/json', (req,res)=>{
    console.log( req.body );        //  Logging the request in server-side
    res.json( req.body );           //  Send the request back to client
});


app.listen('3000', (req,res)=> {
    console.log("Web server started at port 3000");
});

