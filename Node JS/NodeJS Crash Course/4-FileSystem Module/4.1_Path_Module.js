/*
    ==================================
    🚅🚅🚅 4.1 - Path Module 🚅🚅🚅
    ==================================

    Ever get frustrated with paths? No more worries using NodeJS's Path module!

    First, require the module,
        const path = require('path');

    Then, let's explore some of the commonly used methods in path:

    >   path.basename(path)         -   Essentially gets the filename.          Eg: index.html
    >   path.dirname(path)          -   Gets the path without the filename      Eg: /home/static
    >   path.extname(path)          -   Gets the extension of the file          Eg: .html
    >   path.parse(path)            -   Returns an object that contain useful
                                        information of the path, like:
                                        { root, dir, base, ext, name }
    >   path.join(strs)             -   Join the string elements into a valid
                                        path seperated by seperators
*/

const path = require('path');

function examplePath() {

    const filename = path.basename(__filename);
    const dirname = path.dirname(__filename);
    const ext = path.extname(__filename);

    console.log(`Filename is ${filename}`);
    console.log(`Dirname is ${dirname}`);
    console.log(`Extension name is ${ext}`);

    const parsed = path.parse(__filename);

    console.log(`Parsed object:`);
    console.dir(parsed);

    const joined = path.join(dirname, dirname);

    console.log(`Joined path: ${joined}`);
}

// examplePath();
console.log(process.env.PORT);