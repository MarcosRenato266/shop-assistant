import chalk from 'chalk';
import uuidv1 from 'uuid/v1';
import users from './data/users';

const setup = async ({ models, silent = false }) => {
  const log = (...args) => (silent ? null : console.log.apply(null, args));

  log(chalk.blue('== Database setup... =='));

  /*
  * Initial users
  */
  // log(chalk.yellow('• Users'));

  // const baseUser = await models.User.build({});
  // const usersBucket = [];
  // const partnersBucket = [];
  // const clientsBucket = [];
  // const hashCache = {};
  // const generateHash = async password => {
  //   const hash = await baseUser.generateHash(password, true);
  //   hashCache[password] = hash;
  //   return hashCache[password];
  // };

  // for (const user of users) {
  //   const password =
  //     hashCache[user.password] || (await generateHash(user.password));

  //   const _user = {
  //     id: uuidv1(),
  //     name: user.name,
  //     pictureUrl: user.pictureUrl,
  //     cpf: user.cpf,
  //     email: user.email,
  //     accessLevel: user.accessLevel,
  //     password,
  //   };

  //   if (user.client) {
  //     const _client = {
  //       __name: user.name, // utilized on the partner bellow
  //       id: uuidv1(),
  //       approved: user.client.approved,
  //       patternPassword: user.client.patternPassword,
  //     };
  //     _user.asClientId = _client.id;
  //     clientsBucket.push(_client);
  //   }

  //   if (user.partner) {
  //     const _partner = {
  //       id: uuidv1(),
  //       internalId: user.partner.internalId,
  //       status: user.partner.status,
  //       city: user.partner.city,
  //       stateCode: user.partner.stateCode,
  //       partnerDataType: 'LEGAL',
  //     };
  //     _user.asPartnerId = _partner.id;
  //     for (let i = 0; i < user.partner.clients.length; i++) {
  //       const clientName = user.partner.clients[i];
  //       const client = clientsBucket.find(c => c.__name === clientName);
  //       client.partnerId = _partner.id;
  //     }
  //     partnersBucket.push(_partner);
  //   }

  //   usersBucket.push(_user);
  // }

  // await models.Partner.bulkCreate(partnersBucket, {ignoreDuplicates: true});
  // await models.Client.bulkCreate(clientsBucket, {ignoreDuplicates: true});
  // await models.User.bulkCreate(usersBucket, {ignoreDuplicates: true});

  log(chalk.blue('== Database setup complete =='));
};

export default setup;
