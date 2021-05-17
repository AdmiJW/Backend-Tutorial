
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

    Client side -> send Request -> Received by server -> 1 or more middlewares -> Request Handler (Terminal) -> Send Response

    Some of the middlewares we've seen previously are:
            bodyParser.json()
            bodyParser.urlencoded()
            express.static()
    Say bodyParser, it tries to read the request's body, determine if it has respective data, and
    parses the body readily in JSON for us to perform operations.

    Middlewares are quite useful and is the core of express! For example, we might have a CORS middleware that helps us
    add CORS headers into the response in every request made!
    
    From the statement just now, you'll realize that the common function of middleware, is to manipulate request and response
    object! json() parses the body of request, and overwrites the req.body with the meaningful Javascript Object.
    The CORS middleware that we came up with, manipulates the res.header object property to include additional CORS policy!
    -----------------------------------------------------------------------------

    Of course we can make our very own middleware! A middleware is essentially just a 3 parameter
    function:
            function exampleCallback(req, res, next) {...}

    Here when we call app.use( middleware ), the middleware will be added to our web app.

            app.use(exampleCallback)

    Since we call app.use() without specifying any route, it is called UNIVERSAL MIDDLEWARE, meaning that
    this middleware will process all the requests, regardless of the route

    For route-specific middlewares, use app.use(route, middleware), like 
        app.use('/mid', middlewarefunc)
    In this case, the middlewarefunc will only be executed when the request visits the route '/mid'

            app.use( (req,res,next)=> {
                ...
                next();
            })

    The next() function is one callback function passed in by the express framework. Upon called, the express
    knows that it's time for the next middleware to be executed.
    The reasoning for this design, is because middlewares may perform asynchronous tasks, like reading from
    database. Only after data from database is read, only the next middleware should be sent.
    next() must be called at the end so that the control transfers to the next middleware or
    the request handlder. If not, the server request will be timed out.

    ----------------------------------------------------------------------------

    When errors occur in the midst of middleware, the error thrown will be passed into DEFAULT ERROR HANDLER, which
    is simply just another middleware-like function.
    As you might see before, the default error handler responded with a error message with the call stack.

    Error might be thrown in middlewares in several ways.
        >   Synchronous:    
                ...
                throw new Error("Error Occurred");              <<- Automatically Error is catched and passed to error handler
        >   Asynchronous:
                ...
                readFile(..., ()=> {
                    if (successful) res.send(data);
                    else next(err);                         <<- Call next() with a error argument!
                })
        >   Promises:
                ... 
                await promiseThatMightThrowError;       <<- If promise is rejected, error is catched automatically

    You can see, the next() we call normally, if passed with error object, indicates there is an error and request
    immediately jumps to the error handler.

    To create our own error handler is nothing more than a middleware function with 4 arguments:

            app.use((err, req,res,next)=> {
                ...error handling code
            });

    To pass from one error handler to another, simply call next() with the err object once more! At the end, it will still
    be passed to default error handler so don't worry!
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