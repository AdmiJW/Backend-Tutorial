# 🛡️ Mocha and Chai for Quality Assurance and Testing 🛡️

For large an complex projects, it is recommended that we develop a testing system so to ensure our program remains bug-free as we develop and implement new features.

With those tools, we can easily perform unit tests, from as low level as return value of functions, to functional tests, up to the level of testing both front-end (HTTP and AJAX) and back-end (API) functionalities.

---
<br/>


## `Mocha` - Testing Framework

> Official Documentation is found [__HERE__](https://mochajs.org) 

`Mocha` is a feature-rich JavaScript test framework running on Node.js and in the browser.

We essentially will write scripts that will help test our program. Through `mocha`, we can test for each of these conditions and output them neatly

Example:
* Whether the value returned by a function equals what we think it will?
* Whether the frontend really renders a successful login div when the user filled in his credentials and clicked the submit button
* Whether our API endpoint really returns a JSON that is identical to what we expected?

---
<br/>

## `Chai` - Assertion Library

> Official Documentation is found [__HERE__](https://www.chaijs.com/) 

When we want to test if an value is what we expected (Eg: is `isRegistered('AdmiJW')` really returns `true`?), we could use the `node.js` built in `assert` library, but of course, it is not as powerful as `chai`, a library specifically created for the purpose of asserting!

```javascript
// Assert style
assert.equal(3 + 5, 8, '3 + 5 is not 8');
assert.isTrue( isRegistered('AdmiJW') );

// BDD style
expect([1,2,3]).to.be.an('array').that.does.not.include(0);
```

---

## Example Usage

1. First, install `mocha` and `chai` through npm or yarn
    
    `npm install --save-dev mocha chai`

1. In the root directory of your project, create a directory `test` which will include all testing scripts.

1. In `package.json`, you may want to set up a `test` command to execute `mocha`. To disable ugly error messages when running tests, use `mocha || true` or use `npm run test -s`.

    ```json
    "scripts": {
        "test": "mocha"
    },
    ```

1. Choose your mocha interface [__HERE__](https://mochajs.org/#interfaces). Say if you choose `BDD` interface, then your test scripts would look like (Note that BDD interface is used by default. To use other options, say TDD, you need to run mocha like `mocha -u tdd`)

    ```javascript
    // A group of tests
    describe('My unit tests', function() {
        
        // Tests
        it('isRegistered() function', function(done) {
            // Assertions
            done();
        });
    });
    ```

    or if you so choose `TDD` interface, then:

    ```javascript
    // A group of tests
    suite('My unit tests', function() {
        
        // Tests
        test('isRegistered() function', function(done) {
            // Assertions
            done();
        });
    });
    ```

1. More notes regarding to using `chai` inside this repository's test directory.

1. You may want to set up something before execution of scripts. By looking at the interface documentations above, you notice there are various hooks available to us, like in `TDD` interface, we may use `suiteSetup()`, `suiteTeardown()`, `setup()`, and `teardown()`.

    > Documentation on Hooks [__HERE__](https://mochajs.org/#hooks)

    ```javascript
    suite('Test', ()=> {
        suiteSetup(function() {
            // runs once before the first test in this block
        });

        suiteTeardown(function() {
            // runs once after the last test in this block
        });

        setup(function() {
            // runs before each test in this block
        });

        teardown(function() {
            // runs after each test in this block
        }); 
    });
    ```