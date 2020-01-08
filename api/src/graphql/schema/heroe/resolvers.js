import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import { HeroeAlreadyExists } from '../../errors';

const getCanUseCategories = baseResolver.createResolver(async root => {
  const canUseCategoriesPool = [];
  root.canUseCategories.map(async category => {
    canUseCategoriesPool.push(
      await models.Category.findAll({ where: { subCategory: category } }),
    );
  });
  return canUseCategoriesPool;
});

const heroeById = baseResolver.createResolver(async (root, { heroeId }) => {
  return models.Heroe.findByPk(heroeId);
});

const heroeByClass = baseResolver.createResolver(
  async (root, { heroeClass }) => {
    return await models.Heroe.findOne({
      where: { className: heroeClass },
    });
  }
);

const heroeByElement = baseResolver.createResolver(
  async (root, { element }) => {
    return await models.Heroe.findOne({
      where: { element: element },
    });
  }
);

// Mutation type
const registerHeroe = baseResolver.createResolver(async (root, { input }) => {
  const {
    className,
    subClass,
    goldHireCost,
    gemsHireCost,
    prerequisite,
    criticalChancePercent,
    criticalDamageTimes,
    threatRating,
    hp,
    atk,
    def,
    evaPercent,
    element,
    equipmentSlots,
    skillUnlock,
  } = input;

  // if (!relatedItemId || !rarity || !perfectRuneId || !perfectSpirityRuneId)
  //   return new buildMissingFields();

  const existentHeroe = await models.Heroe.findOne({
    where: { className, subClass },
  });
  if (existentHeroe) return new HeroeAlreadyExists();

  return models.sequelize
    .transaction(async transaction => {
      const heroeModel = await models.Heroe.create(
        {
          className,
          subClass,
          goldHireCost,
          gemsHireCost,
          prerequisite,
          criticalChancePercent,
          criticalDamageTimes,
          threatRating,
          hp,
          atk,
          def,
          evaPercent,
          element,
          equipmentSlots,
          skillUnlock,
        },
        { transaction }
      );

      return heroeModel;
    })
    .catch(err => {
      console.log(err);
    });
});

export default {
  Heroe: {
    canUseCategories: getCanUseCategories,
  },
  Query: {
    heroeById,
    heroeByClass,
    heroeByElement,
  },
  Mutation: {
    registerHeroe,
  },
};
