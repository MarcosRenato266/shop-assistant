import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  itemMissingFields,
  itemAlreadyExists,
  itemTransactionError,
} from '../../errors';

const getHeroesThatCanUse = baseResolver.createResolver(async root => {
  const relatedCategory = await root.getRelatedCategory();
  const allHeroes = await models.Heroe.findAll();

  return allHeroes.filter(heroe => {
    return heroe.canUseCategories.includes(relatedCategory.subCategory);
  });
});

const getPerfectBuild = baseResolver.createResolver(async root => {
  return await models.Build.findAll({
    where: { RelatedToItemId: root.internalId },
  });
});

const getCategory = baseResolver.createResolver(async root => {
  return await root.getRelatedCategory();
});

const itemById = baseResolver.createResolver(async (root, { itemId }) => {
  return models.Item.findByPk(itemId);
});

const itemByInternalId = isAuthenticatedResolver.createResolver(
  async (root, { itemInternalId }) => {
    return await models.Item.findByPk(itemInternalId);
  }
);

const getAllItens = baseResolver.createResolver(async () => {
  return models.Item.findAll();
});

// Mutation type
const registerItem = baseResolver.createResolver(async (root, { input }) => {
  const { internalId, name, categoryId, tier, itemImage } = input;
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
        RelatedCategoryId: categoryId,
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
    category: getCategory,
    heroesThatCanUse: getHeroesThatCanUse,
  },
  Query: {
    itemById,
    itemByInternalId,
    getAllItens,
  },
  Mutation: {
    registerItem,
  },
};
