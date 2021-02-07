
const express = require('express');
const path = require('path');

const router = express.Router();


//  Applying middleware to route
router.use( (req,res,next)=> {
    req.roll = Math.floor(Math.random() * 6 + 1);
    next();
});


//  Request Handler for route
router.get('/', (req,res)=> {
    res.render( path.join(__dirname, 'static', 'dice.ejs'), {data: {} } );
});

router.post('/', (req,res)=> {
    res.render( path.join(__dirname, 'static', 'dice.ejs'), {data: {
        roll: req.roll
    }})
});


module.exports = router;