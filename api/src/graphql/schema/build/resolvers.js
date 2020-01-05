import models from '../../../models';
import {
  baseResolver,
  isAuthenticatedResolver,
} from '../../baseResolvers';
import {
  buildMissingFields,
  buildAlreadyExists,
  buildTransactionError,
} from '../../errors';

const getRelatedItem = baseResolver.createResolver(
  async root => {
    return await root.getRelatedToItem();
  },
);

const getPerfectRune = baseResolver.createResolver(
  async root => {
    return await root.getPerfectRune();
  },
);

const getPerfectSpirityRune = baseResolver.createResolver(
  async root => {
    return await root.getPerfectSpirityRune();
  },
);

const buildById = baseResolver.createResolver(
  async (root, { buildId }) => {
    return models.Build.findByPk(buildId);
  },
);

const buildItemByInternalId = isAuthenticatedResolver.createResolver(
  async (root, { buildItemInternalId }) => {
    return await models.Build.findByPk(buildItemInternalId);
  }
);

// Mutation type
const registerBuild = baseResolver.createResolver(async (root, { input }) => {
  const { relatedItemId, rarity, perfectRuneId, perfectSpirityRuneId } = input;

  if (!relatedItemId || !rarity || !perfectRuneId || !perfectSpirityRuneId) return new buildMissingFields();

  const existentBuild = await models.Build.findOne({
    where: { RelatedToItemId: relatedItemId, rarity: rarity },
  });
  if (existentBuild) return new buildAlreadyExists();

  const relatedItem = await models.Item.findOne({
    where: { id: relatedItemId },
  });

  const perfectRune = await models.Item.findOne({
    where: { id: perfectRuneId },
  });

  const perfectSpirityRune = await models.Item.findOne({
    where: { id: perfectSpirityRuneId },
  });

  return models.sequelize
    .transaction(async transaction => {
      const buildModel = await models.Build.create({
        rarity,
      }, { transaction });

      await buildModel.setRelatedToItem(relatedItem, { transaction });
      await buildModel.setPerfectRune(perfectRune, { transaction });
      await buildModel.setPerfectSpirityRune(perfectSpirityRune, { transaction });

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
  },
  Query: {
    buildById,
    buildItemByInternalId,
  },
  Mutation: {
    registerBuild,
  },
};
