
/*
    =============================================================
    📢📢📢 Routing, Route Parameters, and Query Strings 📢📢📢
    =============================================================

    Just now, we learned to respond to GET requests at the root directory.
    However, we need to respond to other routes as well! Like '/profile'
*/

const express = require('express');
const app = express();


function routingExample() {
    app.get('/', (req,res)=> {
        res.send(`Welcome to the main page! <a href='./profile'>Click to go to your profile</a>`);
    });
    
    
    app.get('/profile', (req,res)=> {
        res.send(`Your Profile! <a href='/'>Click to go to your profile</a>`);
    });
}


/*
    Route Paramaters are like regular paths, except that some directory may turns out to be non-existant
    in the file system, and we can retrieve them as variable, make corresponding responses according to
    the route parameters.
    
    Example:        /profile/AdmiJW
                    /profile/Alexa              <<  The back part is the route parameters

    To serve and retrieve route parameters, in the path paramter, prefix with a colon : for the part we
    want to use route parameter. Like:

                    /profile/:nickname

    Then, in the callback, we can retrieve an JSON object containing key value pairs of the route parameters
    using 

                    req.params              <<  Returns an object containing the key value pairs of route param
         
                    
    💡💡💡  Use Route Parameters for variables you absolutely need, like Profile name 💡💡💡
*/

function exampleRouteParam() {
    app.get('/', (req,res)=> {
        res.send(`
            <a href='./profile/AdmiJW'> AdmiJW </a>
            <a href='./profile/Alexa'> Alexa </a>
        `);
    });

    app.get('/profile/:name', (req,res)=> {
        const params = req.params;
        
        if (params.name === 'AdmiJW') res.send(`Welcome Owner! <a href='/'>Back</a>`);
        else if (params.name === 'Alexa') res.send(`Welcome Alexa! <a href='/'>Back</a>`);
        else res.send(`Welcome ${params.name} <a href='/'>Back</a>`);
    });
}



/*
    Query Strings are simply key value part of the URL that is after the ? part. It also encodes some
    information that get sent to the server.

            Eg:     /count-to-10?sortby=asc

    Here the sortby is the key, and asc is the value

    To parse is absolutely easy in ExpressJS. Simply:

            req.query               <<  The JSON object containing the key value pairs

    💡💡💡  Use Query String for variables you MAY need or NOT need, like sort by 💡💡💡
*/


function exampleQueryString() {
    let arr = [1,2,3,4,5,6,7,8,9,10];

    app.get('/', (req,res)=> {
        res.send(`
            <p><a href='./count-to-10'>Count to 10</a></p>
            <p><a href='./count-to-10?sortby=asc'>Ascending</a></p>
            <p><a href='./count-to-10?sortby=desc'>Descending</a></p>
            <p><a href='./count-to-10?sortby=rand'>Random</a></p>
        `);
    })

    app.get('/count-to-10', (req,res)=> {
        const { sortby } = req.query;
        console.log(sortby);

        if (!sortby || sortby === 'asc') arr = arr.sort( (x,y)=> x-y);
        else if (sortby === 'desc') arr = arr.sort( (x,y) => y-x);
        else if (sortby === 'rand') arr = arr.sort( ()=> Math.random() - 0.5 );

        res.send(`
            ${ arr.toString() }
            <p><a href='/'>Back</a></p>
        `);
    });
}


app.listen(3000);