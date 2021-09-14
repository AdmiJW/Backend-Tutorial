// Module imports
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const ConnectMongo = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Internal Application imports
const dbConnection = require( path.join(__dirname, 'src', 'database.js'));
const routes = require( path.join(__dirname, 'routes', 'routes.js'));


//========================
// Express Session Setup
//========================
const sessionStore = ConnectMongo.create({
    mongoUrl: process.env.MONGODB_URL
});
app.use(cookieParser());
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60                // 1 Hour expiry
    },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: sessionStore
}));
// Middleware for flash messages. Adds req.flash
app.use(flash());

//=======================
// PassportJS Setup
//========================
// Basic configuration of passportJS is set in src/passport.js. We just need to call require to run the code
require( path.join(__dirname, 'src', 'passport.js'));

// Apply middleware to complete the setup of passport js
app.use( passport.initialize());
app.use( passport.session());



//=======================
// Configurations
//=======================
// View engine Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Form content parsing
app.use( express.urlencoded({extended: true}) );


// Routes
app.use(routes);


app.listen( process.env.PORT || 3000, ()=> {
    console.log("Web application started on port " + (process.env.PORT || 3000));
    console.log("Mode: " + process.env.NODE_ENV);
});