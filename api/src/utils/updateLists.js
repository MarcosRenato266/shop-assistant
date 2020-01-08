import { getItens } from './getItens';
import { getCategories } from './getCategories';
import chalk from 'chalk';

export default function updateLists() {
  console.log(chalk.green('• Crawling Categories'));
  getCategories().then(() => {
    console.log(chalk.green('• Crawling Items'));
    getItens();
  });
}
