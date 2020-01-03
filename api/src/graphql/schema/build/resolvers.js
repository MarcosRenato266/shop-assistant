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

const buildById = isAuthenticatedResolver.createResolver(
  async (root, { buildId }) => {
    return await models.Build.findById(buildId);
  }
);

const buildItemByInternalId = isAuthenticatedResolver.createResolver(
  async (root, { buildItemInternalId }) => {
    return await models.Build.findById(buildItemInternalId);
  }
);

// Mutation type
const registerBuild = baseResolver.createResolver(async (root, { input }) => {
  const { itemByInternalId,
    rarity,
    perfectRune,
    perfectSpirity } = input;

  if (!itemByInternalId ||
    !rarity ||
    !perfectRune ||
    !perfectSpirity) return new buildMissingFields();

  const existentBuild = await models.Item.findOne({
    where: { itemByInternalId: itemByInternalId, rarity: rarity },
  });

  if (existentBuild) return new buildAlreadyExists();

  return models.sequelize
    .transaction(async transaction => {
      const buildModel = await models.Build.build({
        itemByInternalId,
        rarity,
        perfectRune,
        perfectSpirity
      });
      const build = await buildModel.save({ transaction });

      return build;
    })
    .catch(err => {
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
