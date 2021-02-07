
/*    
    We are not only restricted to only dealing with files. We can also manipulate directories

    ------------------ 📂 DIRECTORY RELATED METHODS 📂 --------------------------

    >   fs.mkdir( filepath, callback )
                        -   Creates a directory

    >   fs.rmdir( filepath, callback )
                        -   Removes a directory. The directory to remove must be empty

    >   fs.readdir( filepath, callback )
                        -   Returns a list of files inside the specified directory
                            The list is passed into the callback function
                        -   If you want to differentiate between file and directory,
                            pass in a options Object with 'withFileTypes: true'
*/

const fs = require("fs");



function exampleMkDir() {
    fs.mkdir('./NodeJS Crash Course/4-FileSystem Module/ExampleDirectory',              //FilePath
        (err)=> {                                                                       //Callback
            if (err) console.log("Unable to create directory " + err);
            else console.log("Directory 'ExampleDirectory' successfully created!");
    });
}



function exampleRmDir() {
    fs.rmdir('./NodeJS Crash Course/4-FileSystem Module/ExampleDirectory',              //FilePath
        (err)=> {                                                                       //Callback
            if (err) console.log("Unable to remove directory " + err);
            else console.log("Directory 'ExampleDirectory' successfully deleted!");
    });
}



function exampleReadDir() {
    fs.readdir('./NodeJS Crash Course/4-FileSystem Module',                     //FilePath
        (err, filelist)=> {                                                     //Callback
            if (err) console.log("Unable to read directory " + err);
            else {
                console.log( filelist )
            }
    });
}