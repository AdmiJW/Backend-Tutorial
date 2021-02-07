
/*
    =============================================
    ✔️✔️✔️ 9.6 - Basic Input Validation ✔️✔️✔️
    =============================================

    You'll be in big trouble if you only rely on client side input validation. Hackers easily
    manipulate javascript and form data to whatever they want.

    Therefore, we shall implement user input validation in server side as well. This is done
    easily using module 'joi'. NPM install it!

    To validate, first create a schema. Using example before, it would be like this:

    const schema = Joi.object().keys({                          
        email: Joi.string().trim().email().required(),          
        password: Joi.string().min(5).max(10).required()
    });

    object()        -   The data to check must be JSON object
    keys()          -   We want to further extend the checking down to its key value pairs

    -------------------------

    With the schema set, easily validate now with:

    schema.validate( data, schema, (err,result) => {....} )
*/


const express = require('express');
const path = require('path');
const Joi = require('joi');
const bodyParser = require('body-parser');

const app = express();

app.use('/json', bodyParser.json() );
app.use('/', express.static( path.join(__dirname, 'static') ) );

app.get('/json', (req,res)=> {
    res.sendFile( path.join(__dirname, 'static', 'ajax.html') );
});


app.post('/json', (req,res)=> {
    
    const schema = Joi.object().keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(5).max(15)
    });

    const { error, value } = schema.validate(req.body);
    
    if (error) {
        console.log("Error!" + error );
        res.send("Invalid Data! " + error);
    } else {
        console.log("Success! " + JSON.stringify(value) );
        res.send(value);
    }
});




app.listen('3000', ()=> {
    console.log("Web server started at port 3000");
})

