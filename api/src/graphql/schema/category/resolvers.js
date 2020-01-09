import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';

const categoryById = baseResolver.createResolver(
  async (root, { categoryId }) => {
    return models.Category.findByPk(categoryId);
  }
);

const allCategories = baseResolver.createResolver(async () => {
  return models.Category.findAll();
});

export default {
  Query: {
    categoryById,
    allCategories,
  },
};
