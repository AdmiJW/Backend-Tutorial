/*
    ==================================
    2. ES6 Module method 📂
    ==================================

    For ES6 modules however, the file extension itself has to be changed to .mjs to
    indicate for NodeJS that this is a module javascript file, not commonJS
    so that import and export keywords are supported!

    For more information about ES6 imports and exports, visit FrontEnd Tutorial > Javascript.
    Some note is written there
*/

import { add, subtract } from './exampleModule2.mjs';

function ES6ModuleExample() {
    console.log( add(1,2) );
    console.log( subtract(1,2) );
}

ES6ModuleExample();