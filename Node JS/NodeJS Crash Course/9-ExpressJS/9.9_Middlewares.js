
/*
    ================================
    ⚙️⚙️⚙️ 9.9 Middlewares ⚙️⚙️⚙️
    ================================
    
    You have used middlewares several times already, through app.use() function.
    What exactly are middlewares?

    Middlewares are simply functions that are executed to manipulate the request
    or response object, called in between the user request and the server response.
    On other words, those functions are executed before the .get(), .post() method
    etc.

    Client side -> Request -> Received by server -> Middlewares -> Request Handler -> Response

    Some of the middlewares we've seen previously are:
            bodyParser.json()
            bodyParser.urlencoded()
            express.static()
    Say bodyParser, it tries to read the request's body, determine if it has respective data, and
    parses the body readily in JSON for us to perform operations.

    -----------------------------------------------------------------------------

    Of course we can make our very own middleware! A middleware is essentially just a 3 parameter
    function:

            app.use( (req,res,next)=> {
                ...
                next();
            })

    Note that next() must be called at the end so that the control transfers to the next middleware or
    the request handlder. If not, the server request will be timed out.

    ----------------------------------------------------------------------------

    If we just apply middleware without specifying a path, the middleware will be executed for EVERY
    request. This may be not efficient at all.

    Instead, if the middleware is meant for specific path URL only, then we would pass an additional
    parameter into the app.use() function:

            app.use( path, middleware )
*/


const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'static') ) );
app.set('view engine', 'ejs');

//  My own middleware, which appends a random number to request's roll. Only excuted
//  on /dice route
app.use('/dice', (req,res,next)=> {
    req.roll = Math.floor(Math.random() * 6 + 1);
    next(); //  Don't forget!
});

app.get('/dice', (req,res)=> {
    res.render( path.join(__dirname, 'static', 'dice.ejs'), { data: {} } );
});

app.post('/dice', (req,res)=> {
    res.render( path.join(__dirname, 'static', 'dice.ejs'), { data: {
        roll: req.roll      //Access the middleware assgined value through request
    }});
});



app.listen(3000, ()=> {
    console.log("Web Server started on port 3000");
});