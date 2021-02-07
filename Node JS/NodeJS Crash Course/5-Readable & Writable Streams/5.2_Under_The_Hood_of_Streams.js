
/*
    =========================================
    😷😷😷 Under the Hood of Stream 😷😷😷
    =========================================

    How Streams work under the hood? We won't go so deep into its implementation.
    Streams can be split into several types:

    >   Readable Streams    (Stream that provides chunks of data - The Source)
    >   Writable Streams    (Stream that is final destination of that data - Where it is written)
    >   Transform Streams   (Intermediate Stream that manipulates or modify the data)
    >   Duplex Streams      (Stream that is both Writable and Readable, like TCP socket)

    Turns out, we can implement the streams ourselves by inheriting the interface provided
    in 'stream' module!

    >   Implementing Writable Stream
            -   Inheriting Writable class
            -   Implementing the write( chunk, encoding, callback ) method, required

    >   Implementing Readable Stream
            -   Inheriting Readable class
            -   Implementing the read() method.
            -   Use push( chunk ) to push data to buffer. Pass in null to indicate end of data

    >   Implementing Duplex Stream
            -   Inheriting Duplex class
            -   Implement both write() and read() method as above

    >   Implementing Transform Stream
            -   Inheriting Transform class
            -   Implement transform( chunk, encoding, callback ) method, required
            -   Data is passed on by pushing - push()

    
    A Readable Stream starts at defualt 'paused' state, where no data is transferred. It can be
    'resumed' by:

        >   Implementing a 'data' event handler
        >   Manually read() the data chunk
        >   Using resume() 
        >   Using pipe() - Cover in next chapter
*/


const { read } = require('fs');
const { Writable, Readable, Duplex, Transform } = require('stream');






function exampleWriteReadTransform() {

    // Example of Writable stream. It simply console.log the chunk data in String form
    const myWritable = new Writable({
        write(chunk, encoding, callback) {
            console.log(chunk.toString() );
            callback();
        }
    });

    // Example of Readable Stream. It has empty read() implementation. We just use push() to
    // push data
    const myReadable = new Readable({
        read() {}
    });

    // Example of Transform. With transform(), we receive chunk of data, transform and then
    // push data back to itself to allow itself be read by next stream
    const myTransform = new Transform({
        transform(chunk, encoding, callback) {
            this.push( chunk.toString().toUpperCase() );
            callback();
        }
    });


    
    //  Implementing the 'data' events
    myReadable.on('data', (chunk)=> {
        myTransform.write(chunk);
    });
    myTransform.on('data', (chunk)=> {
        myWritable.write(chunk);
    });
    


    //  Start pushing data. Lowercase alphabets from a to z, each 10 times
    for (let i = 0; i < 26; ++i) {
        for (let j = 0; j < 10; ++j)
            myReadable.push( String.fromCharCode(i + 97),  );
    }
    myReadable.push(null);  // Indicate end of data
}







function exampleDuplex() {

    // Example of Duplex - Combination of above 2
    const myDuplex = new Duplex({
        write(chunk, encoding, callback) {
                console.log(chunk.toString() );
                callback();
        },
        read() {}
    });


    
    //  Implementing the 'data' event
    myDuplex.on('data', (chunk)=> {
        myDuplex.write(chunk);
    });


    for (let i = 0; i < 26; ++i)
        for (let j = 0; j < 5; ++j)
            myDuplex.push( String.fromCharCode(i+97) );

}