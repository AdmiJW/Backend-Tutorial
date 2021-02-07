
/*
    ================================================
    🖊🖊🖊 9.8 Embedded Javascript Templating 🖊🖊🖊
    ================================================

    EJS is a simple templating language that let us generate HTML markup with
    plain javascript. It is essentially a HTML template with javascript directly
    embedded in it, like echoes are included in final HTML file in PHP!

    Embedded Javascript files (ejs) must have file extension of .ejs instead of .html.
    Some basics to create a working ejs file:

        <% ... %>   -   Regular script to be executed
        <%= ... %>  -   Output is included in the final HTML.

    -------------------------------------------------------------------------------

    In the server-side, We must set up the view engine to be able to render the EJS. Do:

        app.set('view engine', 'ejs');

    Then, when we want to send out the formatted ejs, use render() method instead of the
    regular sendFile(), while passing in the data to be used in the formatting:

        res.render( filePath, { data: {...} } )
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const faker = require('faker');

const app = express();


app.use('/', express.static(path.join(__dirname, 'static') ) );
app.use('/ejs', bodyParser.urlencoded( {extended: true} ) );
app.set('view engine', 'ejs');

//  Redirect to Anonymous if no name parameter
app.get('/ejs', (req,res)=> {
    res.redirect('/ejs/Anonymous');
});


//  Posted data. Parse name and search, and redirect
app.post('/ejs', (req,res)=> {
    const name = req.body.name || "Anonymous";
    const search = req.body.search;

    res.redirect(`/ejs/${name}?search=${search}`);
});


//  Render EJS here
app.get('/ejs/:name', (req,res)=> {
    const fake = faker.name.findName;
    const query = ` ${req.query.search}`;
    const name = req.params.name;
    const search = (req.query.search? [ fake() + query, fake() + query, fake() + query ]: []);

    res.render( path.join(__dirname, 'static', 'example.ejs'), {    //  Remember to use render() with data passed in
        data: { name, search }
    });
});


app.listen('3000', ()=> {
    console.log("Web Server started at port 3000");
})