import models from '../../../models';
import {
  baseResolver,
  isAuthenticatedResolver,
} from '../../baseResolvers';
import {
  itemMissingFields,
  itemAlreadyExists,
  itemTransactionError,
} from '../../errors';

const getPerfectBuild = baseResolver.createResolver(async root => {
  return await models.Build.findOne({ where: { RelatedToItemId: root.id } });
});

const itemById = baseResolver.createResolver(
  async (root, { itemId }) => {
    return models.Item.findByPk(itemId);
  },
);

const itemByInternalId = isAuthenticatedResolver.createResolver(
  async (root, { itemInternalId }) => {
    return await models.Item.findByPk(itemInternalId);
  }
);

// Mutation type
const registerItem = baseResolver.createResolver(async (root, { input }) => {
  const { internalId, name, category, tier, itemImage } = input;
  if (!internalId || !name || !tier) return new itemMissingFields();

  const existentItem = await models.Item.findOne({
    where: { internalId: internalId },
  });

  if (existentItem) return new itemAlreadyExists();

  return models.sequelize
    .transaction(async transaction => {
      const itemModel = await models.Item.build({
        internalId,
        name,
        category,
        tier,
        itemImage,
      });
      const item = await itemModel.save({ transaction });

      return item;
    })
    .catch(err => {
      return new itemTransactionError();
    });
});

export default {
  Item: {
    perfectBuild: getPerfectBuild,
  },
  Query: {
    itemById,
    itemByInternalId,
  },
  Mutation: {
    registerItem,
  },
};
