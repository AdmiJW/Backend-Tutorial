require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');


app.use('/static', express.static( path.join(__dirname, 'react-frontend', 'build', 'static')));

app.get('/*', (req,res)=> {
    res.sendFile( path.join(__dirname, 'react-frontend', 'build', 'index.html'));
});


app.listen(process.env.PORT || 3000, ()=> {
    console.log("Web application started at port " + process.env.PORT || 3000);
    console.log("Mode: " + process.env.NODE_ENV);
});