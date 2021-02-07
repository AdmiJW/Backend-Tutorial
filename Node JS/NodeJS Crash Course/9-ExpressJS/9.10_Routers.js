
/*
    ==================================
    🚀🚀🚀 9.10 Routers 🚀🚀🚀
    ================================

    So far, we've only included all our backend stuff in one single JS file (Or maybe mjs if you prefer
    ES6 imports)
    If our web application scaling big, it will become more unmanagable. Therefore, we introduce routes,
    which enables us to put request handler in different files!

    First, in the new / different file for specific route only (Eg: /profile ), create an instance of
    Router
    
        const router = express.Router()

    Treat this router thing like the 'app' object! Remember that this route is already fixed on one specific
    path, so '/' means '/profile' in actual.
    You can:

        router.use(...)             <- Apply middleware
        router.get(...)             <- Get Requests
        router.post(...)            <- Post Requests

    Essentially, anything you can do with 'app' object, you can do with router.

    At the end, remember to export. 

        module.exports = router;
        OR
        export default router; (mjs)

    -----------------------------------------------------------------

    Now back in the main file, import the router said earlier.
    Now, treat it as middleware. It is easy as follows:

        app.use('/profile', router);

    And that's it! When the URL is /profile and following, it is going to look into that separate file!
*/

const express = require('express');
const path = require('path');

const app = express();
const diceRoute = require('./9.10.1_DiceRoute.js');     //  Route to /dice

app.set('view engine', 'ejs');
app.use('/', express.static( path.join( __dirname, 'static') ) );

//  Apply /dice Route like it is middleware
app.use('/dice', diceRoute);


app.listen(3000, ()=> {
    console.log('Web Server Started on Port 3000');
});
