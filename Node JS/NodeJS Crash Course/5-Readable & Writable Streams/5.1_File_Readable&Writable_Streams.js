/*
    =====================================
    ✏ Readable and Writable Streams
    =====================================

    We've learned on how to write and read files as well as manipulate them using
    fs.writeFile() and fs.readFile(). However, what it does is:
        >   Open file, move all the data to read into memory, ALL AT ONCE
        >   On write, attempts to write everything AT ONCE into the file

    What if the file is large, like several Gigs? Can several Gigs can be loaded into
    memory? It is not efficient to do so. NodeJS also set a limit on the size of buffer
    that can be used. It is likely it will throw a error during an attempt to read such
    large file.
    Also, having to load large data before actual processing starts takes longer time too!
    It's better to start processing as soon as one smaller piece of data is received.
    (Although in smaller files, loading into RAM all at once is faster)

    ----------------------------------------------------------------------

    Instead, using Readable and Writable Streams, the file will be read part by part,
    called chunks, and written chunk by chunk. This way it won't be memory hogging
    like Google Chrome does 😂😂😂

    Readable Streams and Writable streams are EventEmitters. Especially on Readable
    Stream. It will emit 'data' event on reading a chunk of data. We deal with that
    chunk by setting the on() method

    Here are the methods for setting up and using streams for files:

    >   fs.createReadStream( filePath )     -   Creates a readStream
    >   fs.createWriteStream( filePath )    -   Creates a writeStream

    >   readStream.on( 'data', callback )   -   On 'data' event emitted, do something with the data. The callback
                                                takes in the chunk of data. By default data is read in binary mode.
                                                Set encoding mode to override that, like 'utf8'

    >   writeStream.write( data )           -   Writes chunks of data into the writable stream. We probably don't
                                                need to worry about asynchronous because it is the same writeStream
                                                object
*/

const fs = require('fs');


//  Write big chunks of lowercase english alphabets from a to z, each 10000 times
function exampleWriteStream() {
    const writeStream = fs.createWriteStream('./NodeJS Crash Course/5-Readable & Writable Streams/example.txt');
    
    for (let a = 0; a < 26; ++a) {
        for (let n = 0; n < 10000; ++n) {
            writeStream.write( String.fromCharCode(a + 'a'.charCodeAt(0) ) );
        }
        writeStream.write('\n');
    }

    
    //  'finish' event is emitted when all data is flushed into file already
    writeStream.on('finish', ()=> {
        console.log("All Data has been written successfully!");
    });
}



//  Read the file created above. Count frequencies of characters. 
function exampleReadStream() {
    const readStream = fs.createReadStream('./NodeJS Crash Course/5-Readable & Writable Streams/example.txt', 'utf8');
    const freq = Object();

    readStream.on('data', (chunk)=> {
        for (let c of chunk)
            freq[c] = freq[c] + 1 || 1;
    });


    //  'end' event is emitted when no more data to be read from readable stream
    readStream.on('end', ()=> {
        console.log(freq);
    });
}
