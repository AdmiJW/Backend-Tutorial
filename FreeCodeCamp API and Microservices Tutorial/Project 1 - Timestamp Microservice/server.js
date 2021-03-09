
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


app.use('/public', express.static('public') );



app.get('/', (req,res)=> {
    res.redirect('/api/timestamp');
});


app.get('/api/timestamp', (req,res)=> {
    res.statusCode = 200;
    res.sendFile( path.join(__dirname, 'views', 'index.html') );
});


app.get('/api/timestamp/:time', (req,res)=> {
    const { time } = req.params;

    const converted_time = /^\d+$/.test(time)? Number.parseInt(time): time;
    const date = new Date( converted_time );
    
    if ( date.getTime() ) 
        res.json({
            'utc': date.toUTCString(),
            'unix': Math.floor(date)
        });
    else 
        res.json({'error': 'Invalid Date'});
});


app.listen( process.env.PORT || 3000, ()=> {
    console.log("Server started on port: " + (process.env.PORT || 3000) );
});
