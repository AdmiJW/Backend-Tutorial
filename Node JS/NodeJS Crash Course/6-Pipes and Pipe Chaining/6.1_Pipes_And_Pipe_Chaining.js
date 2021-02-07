
/*
    ========================================
    🚿🚿🚿 Pipes and Pipe Chaining 🚿🚿🚿
    ========================================
    
    We have learned about reading files the forced way (Read everything into RAM), as well as
    using streams, which is much space efficient (but sacrificing a bit time on the way)

    However, using Streams, we are utilizing the EventEmitter's on() method to perform stuff
    that we want, especially 'data' event. Turns out, there is a much elegant way of doing it

    Streams has an pipe() method. The syntax goes as follows:
        readableStream.pipe( writableStream )
    Basically, every chunk of data that is read by readibleStream, will automatically be consumed
    by the writableStream.
            
    The pipe essentially helps you to handle data events, and write into the target Stream, like so:

        readStream.on('data', (chunk)=> {
            writeStream.write(chunk);
        });

        readStream.on('end', ()=> {
            writeStream.end();
        });

    All of these is compressed into just one line!
        
        readStream.pipe(writeStream);
*/

/*
    🍀 Bonus: Do you know stdin is a readable Stream? stdout is also a writable Stream 🍀
*/


const fs = require('fs');



function examplePipe() {
    const writeStream = fs.createWriteStream('./NodeJS Crash Course/6-Pipes and Pipe Chaining/your_input.txt');
    
    console.log("✍ Enter the text to be written to text file, Ctrl+C to terminate: ");
    process.stdin.pipe(writeStream);
}





/*
    ⛓⛓⛓ In addition, we could perform pipe chaining. ⛓⛓⛓

    This is due to the return value of pipe() is simply the argument passed into it.
    Therefore, piping is not only limited to just starting with readable stream and
    immediately piped to writable stream only. It can involve duplex and transform streams too!

    
    Additionally, do you know that pipe() method actually don't really interfere with event
    handlers? Due to this, we can further customize the behavior of the streams when certain
    event is emitted, like a progress bar!

    -----------------------------------------------------------------

    Let's introduce some nice inbuilt transform streams! 

    Module 'zlib' is a file compression module which is a transform stream! With it we can
    create zipped files easily as well as unzip files in Javascript

    >   zlib.createGzip()           -   Creates a transform stream ready to compress data
    >   zlib.createGunzip()         -   Creates a transform stream ready to uncompress data

    ---------------------------------------------------------------------

    Module 'crypto' is a encryption module which encrypts our chunks of data with standard
    encryption algorithms!

    >   crypto.createCipher( encryptType, key )
    >   crypto.createDecipher( encryptType, key )
*/

const stream = require('stream');
const zlib = require('zlib');
const crypto = require('crypto');

const key = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);


function createEncryptedZip( callback ) {

    const readStream = new stream.Readable({
        read() {}
    });
    const compStream = zlib.createGzip();
    const encryptStream = crypto.createCipheriv('aes-256-cbc', key, initVector ); 
    const writeStream = fs.createWriteStream('./NodeJS Crash Course/6-Pipes and Pipe Chaining/zipped.zz');

    //  Fill Read Stream with alphabets
    for (let i = 97; i < 123; ++i) {
        for (let j = 0; j < 5; ++j)
            readStream.push( String.fromCharCode(i) );
    }
    readStream.push(null);  //  End of File


    readStream
        .pipe(encryptStream)
        .on('data', ()=> process.stdout.write('*') )
        .on('finish', ()=> process.stdout.write('Encryption Complete!\n') )
        .pipe(compStream)
        .on('data', ()=> process.stdout.write('.') )
        .on('finish', ()=> process.stdout.write('Compression Complete!\n') )
        .pipe(writeStream)
        .on('finish', ()=> {
            process.stdout.write("The Zipped file successfully created!\n\n");
            callback();
        });
}




function decipherEncrypted() {
    const readStream = fs.createReadStream('./NodeJS Crash Course/6-Pipes and Pipe Chaining/zipped.zz');
    const writeStream = fs.createWriteStream('./NodeJS Crash Course/6-Pipes and Pipe Chaining/decrypt.txt');
    const decompStream = zlib.createGunzip();
    const decipherStream = crypto.createDecipheriv('aes-256-cbc', key, initVector );


    readStream
        .pipe(decompStream)
        .on('data', ()=> process.stdout.write('.') )
        .on('finish', ()=>process.stdout.write('\nDecompression Completed\n') )
        .pipe(decipherStream)
        .on('data', ()=> process.stdout.write('*') )
        .on('finish', ()=> process.stdout.write('Decryption Completed\n') )
        .pipe(writeStream);
        //  Note: be careful if use process.stdout to log though! The ordering is undefined
}



createEncryptedZip( decipherEncrypted );