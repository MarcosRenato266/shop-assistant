import models from '../../../models';
import { baseResolver, isAuthenticatedResolver } from '../../baseResolvers';

const categoryById = baseResolver.createResolver(
  async (root, { categoryId }) => {
    return models.Category.findByPk(categoryId);
  }
);

export default {
  Query: {
    categoryById,
  },
};
