/*
    Javascript is a programming language mainly ran on browser environments. However, with NodeJS, a JavaScript runtime 
    built on Chrome's V8 JavaScript engine, Javascript can be now ran natively without a browser. This opens up an
    opportunity of JS to be used as server-side language!

    With Node JS installed, learn how to execute a Javascript using nodeJS first!

    In Command Prompt / Command Line Interface:
        >   node <filepath>
    Eg:
        >   node app.js
*/


/*

    =============================================================================================================

    📁 1.0 Node Modules 📂

    =============================================================================================================

    Modular programming is important not only in JS but overall in all programming languages. The codes can be
    split up into invididual files rather than all crumpled inside one single file.

    How do we use modules in NodeJS?
        >   commonJS module method
        >   ES6 module method

    For NodeJS, each module is wrapped by what's called 'Module Wrapper Function'. It looks something like this:

    ( function (exports, require, module, __filename, __dirname) {
        ...codes
    });

    So when we require() or import some modules, the function will be found and executed, and the exports will be
    returned for the require() or import.

    Let's see in detail each of the properties:
        >   exports         - Reference to module.exports. If we set module.export to something else,
                                exports still reference to the empty object! Be careful
                                Also, exports shall not be replaced as it is just reference to module.exports
        >   module          - Module information given by NodeJS. Consists of ID, paths, exports etc
        >   require         - Function to be executed when fetching other JS files. SImply takes a pathname,
                                and return that module's module.exports
        >   __filename      - Absolute path to the module executed
        >   __dirname       - Absolute path to the directory where module executed is residing.

*/




/*
    ===================================
    1. commonJS module method 📂
    ===================================

    In older styles of JS, we use require() and module.exports to achieve modularization of codes
*/

function commonJSModule() {

    //  Inside the same folder
    const exampleModule = require('./exampleModule1.js');

    console.log( exampleModule.sum(3,5) );
    console.log( exampleModule.PI );
    
    const exampleCalc = new exampleModule.SumCalculator();
    console.log(exampleCalc.add(3,3) );
}

commonJSModule();


