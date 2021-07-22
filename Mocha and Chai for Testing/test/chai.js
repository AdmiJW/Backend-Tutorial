// To use chai is very simple. The official documentation can be found at https://www.chaijs.com/
// First, we require chai from package. Here, we will walk through some of the assertion methods in chai

const chai = require('chai');
const assert = chai.assert;


suite('Unit Tests', function () {

  //==============================================
  // Basic Assertions
  //==============================================
  suite('Basic Assertions', function () {

    // #1 - isNull and isNotNull - Simply checks === null
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'this is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });

    // #2 - isDefined and isUndefined - Simply checks === undefined
    // Remember that null is considered as defined. Only undefined itself is undefined
    test('#isDefined, #isUndefined', function () {
      assert.isDefined(null, 'null is not undefined');
      assert.isUndefined(undefined, 'undefined IS undefined');
      assert.isDefined('hello', 'a string is not undefined');
    });

    // #3 - isOk and isNotOk - Checks if it is a Truthy value
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'a string is truthy');
      assert.isOk(true, 'true is truthy');
    });

    // #4 - isTrue and isNotTrue - Checks === true and !== true
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'double negation of a truthy is true');
      assert.isNotTrue({ value: 'truthy' }, 'A truthy object is NOT TRUE (neither is false...)');
    });
  });


  //==============================================
  // Equality Assertions
  //==============================================
  suite('Equality', function () {

    // #5 - equal(), notEqual() - Compares using == and != operator
    test('#equal, #notEqual', function () {
      // When comparing using ==, string is converted into number
      assert.equal(12, '12', 'numbers are coerced into strings with == ');
      // Two different objects in different memory location, although contents is same
      assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
      // When multiply, string is converte into number and multiply
      assert.equal(6 * '2', '12', 'no more hints...');
      // When string meets +, string concatenates become '62'
      assert.notEqual(6 + '2', '12', 'type your error message if you want');
    });

    // #6 - strictEqual() an notStrictEqual() - Compares using === and !==
    test('#strictEqual, #notStrictEqual', function () {
      // Type mismatch
      assert.notStrictEqual(6, '6');
      // The end result is same in value and datatype
      assert.strictEqual(6, 3 * 2);
      // String is converted to number for multiplication
      assert.strictEqual(6 * '2', 12);
      // Two different array in different memory, although same contents
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
    });

    // #7 - deepEqual() and notDeepEqual() - Compare contents of array and objects down to level of basic datatypes,
    //                                       even those who are nested
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "keys order doesn't matter");
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, "array elements position does matter !!");
    });
  });



  function weirdNumbers(delta) {
    return (1 + delta - Math.random());
  }

  //==============================================
  // Comparison Assertions
  //==============================================
  suite('Comparisons', function () {

    // #8 - isAbove - (x > y)
    //      isAtMost - (x <= y)
    test('#isAbove, #isAtMost', function () {
      assert.isAtMost('hello'.length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });

    // #9 - isBelow - (x < y)
    //	  isAtLeast - (x >= y)
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });

    // #10 - approximately(actual, expected, delta) - (exp - delta <= actual <= exp + delta)
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
      assert.approximately(weirdNumbers(0.2), 1, 0.8);
    });
  });



  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];

  //==============================================
  // Arrays Assertions
  //==============================================
  suite('Arrays', function () {

    // #11 - isArray() and isNotArray() - Checks if it is array
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() returns an Array');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number.');
    });

    // #12 - include() and notInclude, checks if
    // 			> element in array
    //			> substring in string
    //			> subset of object in object
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', "It's summer in july...");
      assert.include(backendLanguages, 'javascript', 'JS is a backend language !!');
    });
  });



  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };

  //==============================================
  // Strings Assertions
  //==============================================
  suite('Strings', function () {

    // #13 - isString() and isNotString() - Checks if type is string
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'a float is not a string');
      assert.isString(process.env.PATH, 'env vars are strings (or undefined)');
      assert.isString(JSON.stringify({ type: 'object' }), 'a JSON is a string');
    });

    // #14 - include() an notInclude()
    test('String #include, #notInclude', function () {
      assert.include('Arrow', 'row', "Arrow contains row...");
      assert.notInclude('dart', 'queue', "But a dart doesn't contain a queue");
    });

    // #15 - match() and notMatch() - Matches string with regular expression
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex);
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });



  const Car = function () {
    this.model = 'cedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();


  //==============================================
  // Objects Assertions
  //==============================================
  suite('Objects', function () {

    // #16 - property() and notProperty() - Check if is a existent key in object
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', 'A car has not wings');
      assert.property(airlinePlane, 'engines', 'planes have engines');
      assert.property(myCar, 'wheels', 'Cars have wheels');
    });


    // #17 - typeOf() and notTypeOf() - Check if value is a type of datatype. Check by
    //		Object.prototype.toString()
    test('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.typeOf(airlinePlane.engines, 'array');
      assert.typeOf(myCar.wheels, 'number');
    });

    // #18 - instanceOf() and notInstanceOf() - Check if something is a constructor of an object
    test('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOf(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object, 'everything is an Object');
      assert.notInstanceOf(myCar.wheels, String);
    });
  });
});
