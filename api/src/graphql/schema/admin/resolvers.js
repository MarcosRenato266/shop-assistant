import models from '../../../models';
import { isAuthenticatedResolver, isAdminResolver } from '../../baseResolvers';
import {
  UnknownError,
  DataAlreadyExists,
  InvalidDataError,
  AdminIsNotCreated,
} from '../../errors';

const getUser = isAuthenticatedResolver.createResolver(async root => {
  return await models.User.findOne({ where: { asAdminId: root.id } });
});

const createAdmin = isAdminResolver.createResolver(async (root, { input }) => {
  const { userId } = input;
  const user = await models.User.findByPk(userId);
  if (!user) return new InvalidDataError();
  if (user.asAdminId) return new DataAlreadyExists();

  return models.sequelize
    .transaction(async transaction => {
      const admin = await models.Admin.create(
        {
          userId,
        },
        { transaction }
      );

      await user.setAsAdmin(admin, { transaction });
      await user.update({ accessLevel: 1 }, { transaction });

      return admin;
    })
    .catch(err => {
      return new UnknownError();
    });
});

const updateAdminData = isAdminResolver.createResolver(
  async (root, { input }, { user }) => {
    const admin = await user.getAsAdmin();
    if (!admin) return new AdminIsNotCreated();

    const { city, occupation } = input;
    const result = await admin.update({ city, occupation });
    return !!result;
  }
);

export default {
  Admin: {
    user: getUser,
  },
  Mutation: {
    createAdmin,
    updateAdminData,
  },
};
