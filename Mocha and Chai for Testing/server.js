const express = require('express');
const app = express();
const path = require('path');

// We export the application for the purpose of testing with chai-http
module.exports = app;


// Middlewares
app.use(express.json());
app.use('/public', express.static( path.join(__dirname, 'public') ) );

// Routes
app.get('/', (req, res)=> {
    if (req.query.name)
        return res.send(`Hello ${req.query.name}`);

    res.send('Hello World');
});


app.get('/price', (req,res)=> {
    res.sendFile( path.join(__dirname, 'views', 'index.html') );
});


const prices = {
    "apple": 1.50,
    "orange": 2,
    "pear": 1.75
}
app.post('/price', (req, res)=> {
    if ( prices[req.body.query] )
        return res.json({
            fruit: req.body.query,
            price: prices[req.body.query]
        });
    res.json({
        error: `Error: ${req.body.query || ""} is not in prices list`
    });
});






app.listen(3000, ()=> {
    console.log("Web application started at port " + 3000);
});