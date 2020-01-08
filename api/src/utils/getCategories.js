const puppeteer = require('puppeteer');
import models from '../models';
import { removeDuplicates } from './removeDuplicates';

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

export function getCategories() {
  return new Promise((resolve, reject) => {
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
      while (
        (await page.$$eval(resultsSelector, result => result.length)) < 20
      ) {
        console.log('Waiting all result');
        wait(3000);
        page.click(filterByAllItens);
      }

      const allCategories = await page.$$eval(resultsSelector, nodes => {
        return nodes.map(node => {
          const categories = node
            .querySelector('.Title--Image')
            .style.background.split('icon_')[1]
            .split('.png')[0]
            .split('_');

          const resultCategory = {
            categoryName: categories[0],
            subCategory: categories[1],
            categoryImage: node
              .querySelector('.Title--Image')
              .style.background.split('("')[1]
              .split('")')[0],
          };
          return resultCategory;
        });
      });

      await browser.close();

      // remove duplicates
      const noDupAllCategories = removeDuplicates(
        allCategories,
        'categoryImage'
      );

      const cronToCreateCats = noDupAllCategories.map(async categoryElement => {
        models.sequelize.transaction(async transaction => {
          const categoryModel = await models.Category.create(
            {
              categoryName: categoryElement.categoryName,
              subCategory: categoryElement.subCategory,
              categoryImage: categoryElement.categoryImage,
            },
            { transaction }
          );
          return categoryModel;
        });
      });

      Promise.all(cronToCreateCats).then(() => {
        resolve(true);
      });
      
    })();
  });
}
