import chalk from 'chalk';
import uuidv1 from 'uuid/v1';
import users from './data/users';
import heroes from './data/heroes';

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

  log(chalk.yellow('• Heroes'));

  const heroeBucket = [];

  for (const heroe of heroes) {
    const canUseCategoriesConcat = [
      ...heroe.equipmentSlots[0].itemsAbleToUse,
      ...heroe.equipmentSlots[1].itemsAbleToUse,
      ...heroe.equipmentSlots[2].itemsAbleToUse,
      ...heroe.equipmentSlots[3].itemsAbleToUse,
      ...heroe.equipmentSlots[4].itemsAbleToUse,
      ...heroe.equipmentSlots[5].itemsAbleToUse,
    ];
    const _heroe = {
      id: uuidv1(),
      className: heroe.className,
      subClass: heroe.subClass,
      goldHireCost: heroe.goldHireCost,
      gemsHireCost: heroe.gemsHireCost,
      prerequisite: heroe.prerequisite,
      criticalChancePercent: heroe.criticalChancePercent,
      criticalDamageTimes: heroe.criticalDamageTimes,
      threatRating: heroe.threatRating,
      hp: heroe.hp,
      atk: heroe.atk,
      def: heroe.def,
      evaPercent: heroe.evaPercent,
      element: heroe.element,
      canUseCategories: canUseCategoriesConcat,
      equipmentSlots: heroe.equipmentSlots,
      skillUnlock: heroe.skillUnlock,
    };

    heroeBucket.push(_heroe);
  }

  await models.Heroe.bulkCreate(heroeBucket, { ignoreDuplicates: true });

  log(chalk.blue('== Database setup complete =='));
};

export default setup;
