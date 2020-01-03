import { isInstance } from 'apollo-errors';
import { createResolver } from 'apollo-resolvers';
import { UnknownError, UnauthorizedError, ForbiddenError, DiscontinuedError } from './errors';

const baseResolver = createResolver(null, (root, args, context, err) => {
  if (isInstance(err)) {
    return err;
  }
  if (process.env.NODE_ENV !== 'production') {
    return err;
  }
  return new UnknownError({
    data: {
      name: err.name,
    },
  });
});

const isAuthenticatedResolver = baseResolver.createResolver(
  (root, args, context) => {
    const { user } = context;
    console.log('has user: ', user && user.id);
    if (!user) throw new UnauthorizedError();
    console.log('has user yes!!');
    // const client = await user.getAsClient();
    // if(client && client.id && client.discontinued === true) throw new DiscontinuedError();
  }
);

const isAdminResolver = isAuthenticatedResolver.createResolver(
  (root, args, { user }) => {
    if (!user.isAdmin()) throw new ForbiddenError();
  }
);

module.exports = {
  baseResolver,
  isAuthenticatedResolver,
  isAdminResolver,
};
