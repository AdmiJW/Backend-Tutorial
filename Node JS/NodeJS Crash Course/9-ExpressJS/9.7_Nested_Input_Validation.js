
/*
    ==============================================
    🔎🔎🔎 9.7 Nested Input Validation 🔎🔎🔎
    ==============================================

    User information can easily be nested. Inside a JSON may contain array of JSONs. Therefore,
    we should learn how to validate nested inputs.

    Luckily, it is not hard. What we need to do is simply build the schema piece by piece
    and merge them into one big piece of schema at the end.
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Joi = require('joi');

const app = express();

//  For index.html
app.use( '/', express.static( path.join(__dirname, 'static') ) );

app.use('/complexform', bodyParser.json() );

app.get('/complexform', (req,res)=> {
    res.sendFile( path.join(__dirname, 'static', 'complexform.html') );
});

app.post('/complexform', (req,res)=> {
    const userInfoSchema = Joi.object().keys({
        username: Joi.string().trim().required(),
        email: Joi.string().trim().email().required(),
        age: Joi.number().min(18).max(80).required(),
        password: Joi.string().min(5).max(15).required()
    });
    const submitTimeSchema = Joi.string().isoDate();
    const schema = Joi.object().keys({
        userInformation: userInfoSchema,
        submitTime: submitTimeSchema
    });

    const { error, value } = schema.validate( req.body );

    if (error) {
        console.error("ERror: " + error);
        res.send(error);
    } else {
        console.log("SUccesful: " + value);
        res.send(value);
    }
});


app.listen('3000',()=> {
    console.log("Web server started at port 3000");
});

