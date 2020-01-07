import models from '../../../models';
import {
  baseResolver,
  isAuthenticatedResolver,
  isAdminResolver,
} from '../../baseResolvers';

// User type

const getUserAsAdmin = isAuthenticatedResolver.createResolver(
  async (root, _, { user }) => {
    return await user.getAsAdmin();
  }
);

// Query type
const me = isAuthenticatedResolver.createResolver(async (root, _, { user }) => {
  return user;
});

const userById = isAuthenticatedResolver.createResolver(
  async (root, { userId }) => {
    return await models.User.findByPk(userId);
  }
);

// Mutation type
// const registerUser = baseResolver.createResolver(async (root, { input }) => {
//   const { cpf, deviceToken, password } = input;
//   if (!validateCpf(cpf) || !deviceToken || !password)
//     return new InvalidDataError();

//   const cleanCpfValue = cleanCpf(cpf);
//   const existentUser = await models.User.findOne({
//     where: { cpf: cleanCpfValue },
//   });
//   if (existentUser) return new UserAlreadyExists();

//   return models.sequelize
//     .transaction(async transaction => {
//       const userModel = await models.User.build({ cpf: cleanCpfValue });
//       userModel.password = await userModel.generateHash(password);
//       const user = await userModel.save({ transaction });

//       await models.DeviceToken.create(
//         {
//           token: deviceToken,
//           userId: user.id,
//         },
//         { transaction }
//       );

//       await createLog(
//         models,
//         { step: 1, substep: 1 },
//         { userId: user.id, user },
//         transaction
//       );

//       return user;
//     })
//     .catch(err => {
//       return new UnknownError();
//     });
// });

export default {
  User: {
    asAdmin: getUserAsAdmin,
  },
  Query: {
    me,
    userById,
  },
  Mutation: {
    // registerUser,
    // add this on type defs registerUser(input: RegisterUserInput!): User
  },
};
