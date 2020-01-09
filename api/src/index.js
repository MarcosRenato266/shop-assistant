import chalk from 'chalk';
import models from './models';
import server from './server';
import setupDatabase from './server/setupDatabase';
import updateList from './utils/updateLists';

console.log(chalk.blue('== Shop Assistant loading... =='));

process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', err => {
  console.error('Unhandled Rejection', err);
});

const port = process.env.PORT || '4100';
const RESET_DB = false;

const service = models.sequelize.sync({ force: RESET_DB }).then(async () => {
  // Setup database
  if (RESET_DB) await setupDatabase({ models });

  // Start server
  const serverStart = await server.start({ port });
  console.log(
    chalk.green(`• Server started succesfully, running at port ${port} 🚀`)
  );

  return serverStart;
});

export default service;
