const puppeteer = require('puppeteer');

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

export function getItens() {
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

    // set result selector and wait until he has the full list loaded
    const resultsSelector = '.ItemCard';
    await page.waitForSelector(resultsSelector);
    while ((await page.$$eval(resultsSelector, result => result.length)) < 20) {
      console.log('Waiting all result');
      wait(3000);
      page.click(filterByAllItens);
    }

    // when has the full list turn into json
    const allItens = await page.$$eval(resultsSelector, nodes => {
      return nodes.map(node => {
        const resultItem = {
          internalId: node.querySelector('h2').textContent.replace(/ /g, '_'),
          name: node.querySelector('h2').textContent,
          category: node.querySelector('.Title--Image').style.background,
          tier: node.querySelector('.Tier--Value').textContent,
          itemImage: node.querySelector('.ItemImage').style.backgroundImage,
        };
        return resultItem;
      });
    });
    
    console.log(allItens);
    await browser.close();
  })();
}
