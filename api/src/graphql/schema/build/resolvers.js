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

const buildById = baseResolver.createResolver(
  async (root, { buildId }) => {
    return await models.Build.findOne({
      where: { id: buildId },
    });
  }
);

const buildItemByInternalId = isAuthenticatedResolver.createResolver(
  async (root, { buildItemInternalId }) => {
    return await models.Build.findById(buildItemInternalId);
  }
);

// Mutation type
const registerBuild = baseResolver.createResolver(async (root, { input }) => {
  const { relatedItemId,
    rarity,
    perfectRuneId,
    perfectSpirityId } = input;

  if (!relatedItemId ||
    !rarity ||
    !perfectRuneId ||
    !perfectSpirityId) return new buildMissingFields();

  const existentBuild = await models.Build.findOne({
    where: { relatedItemId: relatedItemId, rarity: rarity },
  });

  if (existentBuild) return new buildAlreadyExists();

  const relatedItem = await models.Item.findOne({
    where: { id: relatedItemId },
  });
  const perfectRune = await models.Item.findOne({
    where: { id: perfectRuneId },
  });
  const perfectSpirity = await models.Item.findOne({
    where: { id: perfectSpirityId },
  });

  return models.sequelize
    .transaction(async transaction => {
      const buildModel = await models.Build.create({
        rarity
      }, { transaction });

      await relatedItem.setRelatedItem(buildModel, { transaction });
      await perfectRune.setPerfectRune(buildModel, { transaction });
      await perfectSpirity.setPerfectSpirity(buildModel, { transaction });

      return buildModel;
    })
    .catch(err => {
      console.log(err);
      return new buildTransactionError();
    });
});

export default {
  Query: {
    buildById,
    buildItemByInternalId,
  },
  Mutation: {
    registerBuild,
  },
};
