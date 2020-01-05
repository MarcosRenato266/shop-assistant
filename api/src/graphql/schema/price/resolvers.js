import models from '../../../models';
import {
  baseResolver,
  isAuthenticatedResolver,
} from '../../baseResolvers';
import {
  priceMissingFields,
  priceAlreadyExists,
  priceTransactionError,
  priceWorksCountMissing,
  priceWorksCountNotFound,
} from '../../errors';

const getRelatedItem = baseResolver.createResolver(
  async root => {
    return await root.getPriceFromItem();
  },
);

const priceById = baseResolver.createResolver(
  async (root, { priceId }) => {
    return models.Price.findByPk(priceId);
  },
);

const priceByItemId = baseResolver.createResolver(
  async (root, { itemId }) => {
    return await models.Price.findOne({ where: { PriceFromItemId: itemId } });
  },
);

// Mutation type
const newPrice = baseResolver.createResolver(async (root, { input }) => {
  const { author, cheap, indicated, expensive, priceFromItemId } = input;

  if (!cheap || !indicated || !expensive || !priceFromItemId) return new priceMissingFields();

  const existentPrice = await models.Price.findOne({
    where: { PriceFromItemId: priceFromItemId, cheap, expensive, indicated },
  });

  if (existentPrice) return new priceAlreadyExists();

  const relatedItem = await models.Item.findOne({
    where: { id: priceFromItemId },
  });

  return models.sequelize
    .transaction(async transaction => {
      const priceModel = await models.Price.create({
        author, cheap, indicated, expensive, worksCounter: 0,
      }, { transaction });

      await priceModel.setPriceFromItem(relatedItem, { transaction });

      return priceModel;
    })
    .catch(err => {
      console.log(err);
      return new priceTransactionError();
    });
});

const priceWorksCountIncrease = baseResolver.createResolver(async (root, { input }) => {
  const { priceId } = input;
  if (!priceId) return new priceWorksCountMissing();

  const price = await models.Price.findByPk(priceId);
  if (!price) return new priceWorksCountNotFound();
  const result = await price.update({ worksCounter: price.worksCounter + 1 });
  return result;
});

export default {
  Price: {
    priceFromItem: getRelatedItem,
  },
  Query: {
    priceById,
    priceByItemId,
  },
  Mutation: {
    newPrice,
    priceWorksCountIncrease,
  },
};
