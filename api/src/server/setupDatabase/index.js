import chalk from 'chalk';
import uuidv1 from 'uuid/v1';
import users from './data/users';

const setup = async ({ models, silent = false }) => {
  const log = (...args) => (silent ? null : console.log.apply(null, args));

  log(chalk.blue('== Database setup... =='));

  /*
   * Initial users
   */
  log(chalk.yellow('• Users'));

  const baseUser = await models.User.build({});
  const usersBucket = [];

  const hashCache = {};
  const generateHash = async password => {
    const hash = await baseUser.generateHash(password, true);
    hashCache[password] = hash;
    return hashCache[password];
  };

  for (const user of users) {
    const password =
      hashCache[user.password] || (await generateHash(user.password));

    const _user = {
      id: uuidv1(),
      name: user.name,
      pictureUrl: user.pictureUrl,
      cpf: user.cpf,
      email: user.email,
      accessLevel: user.accessLevel,
      password,
    };

    usersBucket.push(_user);
  }

  await models.User.bulkCreate(usersBucket, { ignoreDuplicates: true });

  log(chalk.blue('== Database setup complete =='));
};

export default setup;
