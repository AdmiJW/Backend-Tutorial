/*
    📂 Running JS outside a browser means we have the ability to manipulate local computer files! 📂
    We do that by first requiring the module 'fs'

    Let's explore some methods for file and directory manipulation:
    
    >   fs.writeFile( filePath, content, callback ) 
                        -   Writes to file. After completion callback will be called. 
                    
    >   fs.readFile( filePath, encoding, callback )
                        -   Reads from file. After reading complete callback will be called with read
                            contents passed in
                        -   Without encoding, the file will be read in binary mode and a Buffer will
                            be returned. Use utf8 if want to read as unicode

    >   fs.rename( filename, newname, callback )
                        -   Rename files (Or you can move it as well)

    >   fs.appendFile( filename, appendData, callback )
                        -   Append contents to the end of file

    >   fs.unlink( filename, callback )
                        -   Deletes a file


*/



/*
    =======================
    🔥🔥🔥 IMPORTANT 🔥🔥🔥
    =======================

    As usual, JS is synchronous. The script won't wait for the writing of file or similar operation
    to complete before proceeding to next line of code.
    
    👍👍👍 To have synchronous code, each function has its synchronous counterpart! 👍👍👍
    Eg: writeFileSync( .. )
*/

const fs = require('fs');


function exampleWriteFile() {
    fs.writeFile('./NodeJS Crash Course/4-FileSystem Module/exampleText.txt',           //  FilePath
        '😍 Hello From exampleWriteFile 😍',                                           //  Content
        (err)=> {                                                                       //  Callback
        if (err)
            console.log('Failure to write file in exampleWriteFile' + err);
        else
            console.log('exampleFile.txt successfully written!');
    });
}


function exampleReadFile() {
    fs.readFile('./NodeJS Crash Course/4-FileSystem Module/exampleText.txt',        // FilePath
        'utf8',                                                                     // Encoding. Return Binary Buffer if unspecified
        (err, data)=> {                                                             // Callback
            if (err)
                console.log("Failure to read file in exampleWriteFile" + err);
            else 
                console.log(data);
    });
}




function exampleRenameFile() {
    fs.rename('./NodeJS Crash Course/4-FileSystem Module/exampleText.txt',              // FilePath
        './NodeJS Crash Course/text.txt',                                               // NewPath
        (err) => {                                                                      // Callback
            if (err) console.log("Failure to rename file in exampleWriteFile" + err);
            else console.log("Successfully renamed file exampleWriteFile");
    });
}



function exampleAppendFile() {
    fs.appendFile('./NodeJS Crash Course/4-FileSystem Module/exampleText.txt',           // FilePath
        '\n😭 Bye From exampleAppendFile 😭',                                           // Content
        (err) => {                                                                       // Callback
            if (err) console.log("Failure to append file in exampleWriteFile" + err);
            else console.log("Successfully appended file exampleWriteFile");
    });
}




function exampleUnlinkFile() {
    fs.unlink('./NodeJS Crash Course/4-FileSystem Module/exampleText.txt',               // FilePath
        (err)=> {                                                                        // Callback
            if (err) console.log("Failure to append file in exampleWriteFile" + err);
            else console.log("Successfully appended file exampleWriteFile");
    });
}
