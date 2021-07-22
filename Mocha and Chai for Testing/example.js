const puppeteer = require('puppeteer');

(async ()=> {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();

    await page.goto('https://example.com');
    console.log( await page.content() );
})();