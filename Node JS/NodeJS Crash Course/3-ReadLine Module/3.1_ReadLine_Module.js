/*
    =================================
    3.1 ReadLine Module ✍
    =================================

    Now Javascript runs without a browser! It means we have to deal with command line interfaces.
    Back to basics. How do we obtain user input? Well, turns out we need a module for that.

    The module is 'readline' module!

    Readline actually has to have an interface to work on. On Java, it is System.in. On C++, it is cin.
    Therefore, what's in NodeJS?
    NodeJS provides a global object 'process' that has stdin and stdout. That's it!

    Several commonly used methods:

    >   createInterface( { input: ..., output: ... } )     
                                -   As said, an interface needs to be created so it knows where to get input
                                    and output. Returns the interface to be worked on

    >   interface.question( prompt, callback )
                                -   Prompt a message to user for input. Then, the input is passed into the
                                    callback function when calling it

    >   interface.setPrompt( prompt )
                                -   Sets the prompt message.
    >   interface.prompt()    
                                -   Prints the prompt message

    >   interface.write( msg )  -   Writes message to the output

    >   interface.close()       -   Closes the interface stream.
*/



/*
    A note: ReadLine is an instance of EventEmitter talked earlier! It operates on
    events.

    Therefore, we can actually use on(), and emit() on the interface. It may come in
    handy when you want some asynchronous programming actions in the future! Who knows?
*/




/*
    ====================================================================

    🔥🔥🔥 IMPORTANT 🔥🔥🔥

    Remember Javascript run synchronously. When question() is called where the interface has to
    pause, Javascript won't wait for it! Javascript will proceed to next line of code!

    For the code to wait, you have to apply concept of Promises or even newer async and await,
    or just wrap everything in callbacks. Do Avoid callback hell 😉😉

    For more information on asynchronous programming, visit FrontEnd Tutorial > Javascript
*/


const readline = require('readline');

function readLineExample() {
    const inter = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //  Asks for a name. Wrap everything in callback
    inter.question("Please Enter Your Name:", (name) => {
        console.log(`Hello ${name} 😍😍😍`);

        inter.setPrompt("This is example 1\n")
        inter.prompt();
        inter.write("This is example 2");

        inter.close();          //  Remember to close. Otherwise the program won't even stop!
    });
}






//  Asynchronous ES6 for neat codes
async function asyncReadLine() {
    const inter = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Using await requires a Promise to work! Resolve will only be called after user inputs
    await new Promise( (resolve) => {
        inter.question("Enter your name please: ", (name)=> {
            console.log(`Hello ${name} 😍😍😍`);
            resolve();
        });
    });

    inter.setPrompt("This is example 1\n")
    inter.prompt();
    inter.write("This is example 2");

    inter.close();          //  Remember to close. Otherwise the program won't even stop!
}

asyncReadLine();