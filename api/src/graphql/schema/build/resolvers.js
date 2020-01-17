import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  buildMissingFields,
  buildAlreadyExists,
  buildTransactionError,
} from '../../errors';

const getRelatedItem = baseResolver.createResolver(async root => {
  return await root.getRelatedToItem();
});

const getPerfectRune = baseResolver.createResolver(async root => {
  return await root.getPerfectRune();
});

const getPerfectSpirityRune = baseResolver.createResolver(async root => {
  return await root.getPerfectSpirityRune();
});

const getPrices = baseResolver.createResolver(async root => {
  return await models.Price.findAll({ where: { PriceFromBuildId: root.id } });
});

const buildById = baseResolver.createResolver(async (root, { buildId }) => {
  return models.Build.findByPk(buildId);
});

const buildItemByInternalId = baseResolver.createResolver(
  async (root, { buildItemInternalId }) => {
    return await models.Build.findByPk(buildItemInternalId);
  }
);

// Mutation type
const registerBuild = baseResolver.createResolver(async (root, { input }) => {
  const {
    relatedItemId,
    rarity,
    perfectRuneId,
    perfectSpirityRuneId,
    isPerfect,
  } = input;

  if (!relatedItemId || !rarity || !perfectRuneId || !perfectSpirityRuneId)
    return new buildMissingFields();

  const existentBuild = await models.Build.findOne({
    where: {
      RelatedToItemId: relatedItemId,
      rarity: rarity,
      PerfectRuneId: perfectRuneId,
      PerfectSpirityRuneId: perfectSpirityRuneId,
    },
  });
  if (existentBuild) return new buildAlreadyExists();

  const relatedItem = await models.Item.findOne({
    where: { internalId: relatedItemId },
  });

  const perfectRune = await models.Item.findOne({
    where: { internalId: perfectRuneId },
  });

  const perfectSpirityRune = await models.Item.findOne({
    where: { internalId: perfectSpirityRuneId },
  });

  return models.sequelize
    .transaction(async transaction => {
      const buildModel = await models.Build.create(
        {
          rarity,
          isPerfect,
        },
        { transaction }
      );

      await buildModel.setRelatedToItem(relatedItem, { transaction });
      await buildModel.setPerfectRune(perfectRune, { transaction });
      await buildModel.setPerfectSpirityRune(perfectSpirityRune, {
        transaction,
      });

      return buildModel;
    })
    .catch(err => {
      console.log(err);
      return new buildTransactionError();
    });
});

export default {
  Build: {
    relatedToItem: getRelatedItem,
    perfectRune: getPerfectRune,
    perfectSpirityRune: getPerfectSpirityRune,
    prices: getPrices,
  },
  Query: {
    buildById,
    buildItemByInternalId,
  },
  Mutation: {
    registerBuild,
  },
};
