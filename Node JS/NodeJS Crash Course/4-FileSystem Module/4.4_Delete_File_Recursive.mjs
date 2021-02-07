
import fs from 'fs';

/*
    The file structure we will set up is as follows:
    
    >   Folder1
        >   text1.txt
        >   text2.txt
        >   Folder2
            >   text3.txt
        >   Folder3
            >   text4.txt
            >   Folder4
                >   text5.txt

    Then we implement a recursive file deleting code that deletes a directory and its inner files
    using recursion
*/


//  Set up file structure synchronously
function initDirectories() {
    try {
        fs.mkdirSync('./NodeJS Crash Course/4-FileSystem Module/Folder1');
        fs.writeFileSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/text1.txt', '');
        fs.writeFileSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/text2.txt', '');
        fs.mkdirSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder2');
        fs.writeFileSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder2/text3.txt', '');
        fs.mkdirSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder3');
        fs.writeFileSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder3/text4.txt', '');
        fs.mkdirSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder3/Folder4');
        fs.writeFileSync('./NodeJS Crash Course/4-FileSystem Module/Folder1/Folder3/Folder4/text5.txt', '');
    } catch (err) {}
}



//  Recursive function that deletes a directory and contents
function deleteFileRecursive( filePath ) {

    const files = fs.readdirSync( filePath, {withFileTypes: true} );

    for (let f of files) {
        const fPath = `${filePath}/${f.name}`;

        if (f.isDirectory() )
            deleteFileRecursive( fPath );
        else if (f.isFile() )
            fs.unlinkSync( fPath );
    }

    fs.rmdirSync(filePath);
}


const filePath = './NodeJS Crash Course/4-FileSystem Module/Folder1';

initDirectories();
deleteFileRecursive(filePath);