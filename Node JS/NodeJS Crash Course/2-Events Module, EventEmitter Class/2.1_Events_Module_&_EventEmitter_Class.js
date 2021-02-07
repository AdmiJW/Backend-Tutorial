/*
    NodeJS comes with a lot of modules that we need to handle stuff that isn't required
    in a browser environment. Let's explore

    NodeJS has a EventEmitter class that brings Event Driven Programming into NodeJS.
    It is obtained via the 'events' module, and as usual, we can use either commonJS
    or ES6 syntax
*/



/*
    ==========================================
    🔥 Introduction to EventEmitter
    ==========================================

    Basically, EventEmitter is just a simple class, that has 2 essential methods:
    
    on( eventName, callback )   -   Sets up an eventListener. Will execute the callback
                                    when the event occurs
    
    emit( event, ...args )      -   Emits the event. The arguments can be passed into the  
                                    emit function, and will be receive by the callback function
*/

const EventEmitter = require('events');


function eventEmitterExample() {
    const ee = new EventEmitter();
    
    ee.on('greet', (name, emoji)=> {
        console.log(`Hello there ${name} ${emoji}`);
    });

    ee.emit('greet', 'AdmiJW', '😁😁😁');
}





/* =====================================================================
    Notice that it is a class. It turns out to be common that any class
    will be extending the EventEmitter class to have the interface for
    event handling, while implementing own logic and features into it
===================================================================== */
class Person extends EventEmitter {
    constructor(name) {
        super();        //  Make sure to call the super() so that constructor of parent class is called
        this._name = name;

        //  Setting the event 'greet'
        this.on('greet', ()=>{          
            console.log(`Hello! I am ${this.name} 😀😀😀`);
        });
    }

    get name() { return this._name; }       //  Getter. name property won't be changed by alex.name = 'something'
}

function inheritanceEventEmitterExample() {
    const alex = new Person('Alex');
    alex.emit('greet');
}
