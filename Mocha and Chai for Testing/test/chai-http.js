const chai = require('chai');
const assert = chai.assert;

const server = require('../server.js');

const chai_http = require('chai-http');
chai.use(chai_http);

//=========================================================================================================
// Chai-http includes useful assertions that are commonly used when testing servers, especially on express.
// To use chai-http, we need some setups:
//      >   NPM install chai-http
//      >   Require the server (module.exports)
//      >   Apply the plugin to base chai module using chai.use( require('chai-http') );
//=========================================================================================================

suite("Functional Tests", function () {

    suite("Integration tests with chai-http", function () {
        // #1 - GET request (No query param)
        // We would expect our server to return "Hello World"
        test("Test GET /", function (done) {
            chai
                .request(server)
                .get("/")
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "Hello World");
                    done();
                });
        });

        // #2 - GET request (with Query Param)
        // We would expect our server to return "Hello {name}"
        test("Test GET / with your name", function (done) {
            chai
                .request(server)
                .get("/?name=AdmiJW")
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.text, "Hello AdmiJW");
                    done();
                });
        });

        // #3 - POST request
        test('TEST POST /price with empty body', function (done) {
            chai
                .request(server)
                .post("/price")
                .send({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.deepEqual(res.body, { "error": "Error:  is not in prices list" });
                    done();
                });
        });

        // #4 - POST request II
        test('TEST POST /price with "pear"', function (done) {
            chai
                .request(server)
                .post('/price')
                .send({ "query": "pear" })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.type, 'application/json');
                    assert.deepEqual(res.body, {
                        "fruit": "pear",
                        "price": 1.75
                    });
                    done();
                });
        });
    });
});



//=========================================================================================================
// We can even run tests from the perspective of front end user! For this, we will utilize a Headless
// Browser, which is a browser without Graphical User Interface (GUI). 
//
// As of the time of writing, puppeteer.js is a good choice, which is said to be actively maintained by
// a group of developers from google
//=========================================================================================================
const puppeteer = require('puppeteer');          // Headless browser


let browser;
let page;
suite("Functional Tests with Puppeteer.js", function() {
    // When setting timeout for this suite, remember to use regular "function" and not "()=>", as it uses 'this' keyword
    this.timeout(10000);

    //===================================
    // HOOKS 
    //===================================
    // In cases where we use done(), we can also have alternative of returning Promise instead.
    // Remember: async keyword returns a Promise, so using done() and promise at same time will cause error
    suiteSetup(()=> {
        return new Promise(async (resolve)=> {
            browser = await puppeteer.launch();
            resolve();
        })
    });
    // suiteSetup() is a hook ( same as before() ), a function that will be executed before running tests.
    setup(()=> {
        return new Promise(async (resolve)=> {
            page = await browser.newPage();
            await page.goto('http://localhost:3000/price');
            resolve();
        });
    });

    //  At the end of each test case, close the page
    teardown(()=> {
        return new Promise(async (resolve)=> {
            await page.close();
            resolve();
        });
    });

    // At the end of test suite, close the browser
    suiteTeardown(()=> {
        return new Promise(async (resolve)=> {
            await browser.close();
            resolve();
        });
    });

    // Test to ensure the front end is rendering correctly
    test('Page Renders Correctly', ()=> {
        return new Promise(async (resolve, reject)=> {
            assert.isOk( await page.$('form#form'));
            assert.isOk( await page.$('input[type="text"][name="query"]'));
            assert.isOk( await page.$('div#responsetext'));
            assert.deepEqual( await (await page.$('div#responsetext')).evaluate((e)=> e.innerText) , '' );
            resolve();
        });
    });

    // Test if we submit query that couldn't be searched in 'database'
    test('Submit Invalid items', ()=> {
        return new Promise(async (resolve, reject)=> {
            const responseText = await page.$('#responsetext');
            await page.type('#fruit-query', 'abc');
            await page.click('button[type="submit"]')

            await page.waitForTimeout(1000);    // Wait for AJAX to resolve.

            assert.deepEqual( await responseText.evaluate((e)=> e.innerText), 'Error: abc is not in prices list');
            resolve();
        });
    });

    // Test if we submit query that does have a valid response
    test('Submit Valid items', ()=> {
        return new Promise(async (resolve, reject)=> {
            const responseText = await page.$('#responsetext');
            await page.type('#fruit-query', 'apple');
            await page.click('button[type="submit"]')

            await page.waitForTimeout(1000);    // Wait for AJAX to resolve.

            assert.deepEqual( await responseText.evaluate((e)=> e.innerText), 'apple is $1.5');
            resolve();
        });
    });
});
