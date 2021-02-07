
/*
    ========================================
    📂📂📂 Serving Static Files  📂📂📂
    ======================================== 

    If you haven't noticed, up until so far we have only been using res.send() only!
    We want to serve static files instead! Like HTML, images, videos etc.

    💡💡💡 Optional: You can require the 'path' module. It helps us in path modification
            It is used in this example

    To serve static files, we have two options:
        >   Associate the URL with a directory so clients can directly type in the
            file name they want to access, like:

                homepage/photos/cat.jpg

        >   The URL will trigger to search the file and send it directly back to the
            user, like

                homepage/aboutUs

    1. Associate URL with directory

        This method is done via associating the URL with middleware:

            express.static( path in actual file system )

        The middleware function has to be applied to specific URL (if not, every request
        will get processed), via

            app.use( url, express.static(path ) )

        This way, the part after url will work just like addresses in a file system. For example,
            URL = homepage/photos
            Path = static/

        Then, client typing "homepage/photos/cat.jpg" would be equivalent to server as:
            "static/cat.jpg"

    
    2. Second method would be just sending the file itself when the respective URL with correct
        method gets called. This is done by:

            res.sendFile( path To File );
*/

const express = require('express');
const path = require('path');       //  path.join( ...strings ) let you join strings together as path
const app = express();


function exampleStaticFile() {

    //  What this does:
    //  -   On homepage, index.html get served
    //  -   If type /resources, the client has access to everything inside the static directory
    //  Note that now when viewed in Source tab, the index.html seems to be fetched from /resources directory,
    //  not the /static
    app.use('/resources', express.static( path.join(__dirname, 'static') ) );

    app.get('/', (req,res)=> {
        res.sendFile( path.join(__dirname, 'static', 'index.html') );
    });
}


exampleStaticFile();

app.listen(3000);