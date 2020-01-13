const puppeteer = require('puppeteer');
const fs = require('fs');
var path = require('path');

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

export function getAssetsForFront() {
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://playshoptitans.com/blueprints/');

    // click on all itens
    const filterByAllItens = '.ItemFilterCategory';
    await page.waitForSelector(filterByAllItens);
    console.log('waiting page Loads');

    wait(5000);
    page.click(filterByAllItens);

    const resultsSelector = '.ItemCard';
    await page.waitForSelector(resultsSelector);
    while ((await page.$$eval(resultsSelector, result => result.length)) < 20) {
      console.log('Waiting all result');
      wait(3000);
      page.click(filterByAllItens);
    }
    page.on('response', async response => {
      const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());

      if (matches && matches.length === 2) {
        const buffer = await response.buffer();
        const imageExtension = matches[0]
          .replace('https://playshoptitans.com/', '')
          .split('.')[1];
        const imageName = matches[0]
          .replace('https://playshoptitans.com/', '')
          .split('.')[0]
          .split('/')
          .slice(-1)[0];
        const pathImage = matches[0]
          .replace('https://playshoptitans.com/', '')
          .split('.')[0]
          .replace(`${imageName}`, '');

        fs.writeFileSync(
          path.join(__dirname, `${pathImage}${imageName}.${imageExtension}`),
          buffer,
          'base64'
        );
      }
    });
    console.log("Images Saved");
  })();
}
