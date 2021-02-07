
/*
    ==============================
    EXAMPLE FOR commonJS module
    ==============================
    
    When NodeJS reads this module through require(), it will be returning
    the
            module.exports

    Object. Therefore, we associate the things that we want to be exported
    with this Object by simply assigning, or insert properties into the
    object!
*/


const PI = 3.1415;
const sum = (n1,n2) => n1+n2;

class SumCalculator {
    add(n1,n2) {
        return sum(n1,n2);
    }
}


//  Associate everything with module.exports
module.exports = {
    PI,
    sum,
    SumCalculator
};