import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';
import {
  priceMissingFields,
  priceAlreadyExists,
  priceTransactionError,
  priceWorksCountMissing,
  priceWorksCountNotFound,
} from '../../errors';

const getRelatedBuild = baseResolver.createResolver(async root => {
  return await root.getPriceFromBuild();
});

const priceById = baseResolver.createResolver(async (root, { priceId }) => {
  return models.Price.findByPk(priceId);
});

const priceByBuildId = baseResolver.createResolver(
  async (root, { buildId }) => {
    return await models.Build.findOne({ where: { PriceFromBuildId: buildId } });
  }
);

// Mutation type
const newPrice = baseResolver.createResolver(async (root, { input }) => {
  const {
    author,
    moneyCheap,
    moneyIndicated,
    moneyExpensive,
    gemsCheap,
    gemsIndicated,
    gemsExpensive,
    priceFromBuildId,
  } = input;

  if (
    !moneyCheap ||
    !moneyIndicated ||
    !moneyExpensive ||
    !gemsCheap ||
    !gemsIndicated ||
    !gemsExpensive ||
    !priceFromBuildId
  )
    return new priceMissingFields();

  const existentPrice = await models.Price.findOne({
    where: {
      PriceFromBuildId: priceFromBuildId,
      moneyCheap,
      moneyIndicated,
      moneyExpensive,
      gemsCheap,
      gemsIndicated,
      gemsExpensive,
    },
  });

  if (existentPrice) return new priceAlreadyExists();

  const relatedBuild = await models.Build.findOne({
    where: { id: priceFromBuildId },
  });

  return models.sequelize
    .transaction(async transaction => {
      const priceModel = await models.Price.create(
        {
          author,
          moneyCheap,
          moneyIndicated,
          moneyExpensive,
          gemsCheap,
          gemsIndicated,
          gemsExpensive,
          worksCounter: 0,
        },
        { transaction }
      );

      await priceModel.setPriceFromBuild(relatedBuild, { transaction });

      return priceModel;
    })
    .catch(err => {
      console.log(err);
      return new priceTransactionError();
    });
});

const priceWorksCountIncrease = baseResolver.createResolver(
  async (root, { input }) => {
    const { priceId } = input;
    if (!priceId) return new priceWorksCountMissing();

    const price = await models.Price.findByPk(priceId);
    if (!price) return new priceWorksCountNotFound();
    const result = await price.update({ worksCounter: price.worksCounter + 1 });
    return result;
  }
);

export default {
  Price: {
    priceFromBuild: getRelatedBuild,
  },
  Query: {
    priceById,
    priceByBuildId,
  },
  Mutation: {
    newPrice,
    priceWorksCountIncrease,
  },
};
