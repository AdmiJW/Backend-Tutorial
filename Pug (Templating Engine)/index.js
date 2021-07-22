const express = require("express");
const app = express();

//  Require the environment variables
require('dotenv').config();

//  Setting up for the templating engine
app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', (req, res)=> {
    res.render('index', {
        title: "Hello World",
        message: "Hello and Pug is working fine"
    });
});





app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Web server started on port ${process.env.PORT || 3000}`);
});