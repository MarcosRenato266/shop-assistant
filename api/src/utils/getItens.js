const puppeteer = require('puppeteer');
import models from '../models';

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
          category: node
            .querySelector('.Title--Image')
            .style.background.split('("')[1]
            .split('")')[0],
          tier: node.querySelector('.Tier--Value').textContent,
          itemImage: node
            .querySelector('.ItemImage')
            .style.backgroundImage.split('("')[1]
            .split('")')[0],
        };
        return resultItem;
      });
    });
    
    await browser.close();

    //Save all Itens
    allItens.map(itemElement => {
      models.sequelize
        .transaction(async transaction => {
          const itemModel = await models.Item.build({
            internalId: itemElement.internalId,
            name: itemElement.name,
            category: itemElement.category,
            tier: itemElement.tier,
            itemImage: itemElement.itemImage,
          });
          const item = await itemModel.save({ transaction });

          return item;
        })
        .catch(err => {
          err.code === '23505' && console.log('this item already exists.');
        });

    });
  })();
}
