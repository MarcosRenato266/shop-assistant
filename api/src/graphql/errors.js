  import { createError } from 'apollo-errors';

// Mask any internal errors
export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred',
});

// User should be logged in but isn't
export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that',
});

// Client was discontinued
export const DiscontinuedError = createError('DiscontinuedError', {
  message: 'This client was discontinued',
});

// User is already logged in
export const AlreadyAuthenticatedError = createError(
  'AlreadyAuthenticatedError',
  {
    message: 'You are already authenticated',
  }
);

// User is trying to perform an admin function
export const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do that',
});

// The server wasn't able to find the specified user
export const UserNotFound = createError('UserNotFound', {
  message: 'This user does not exist',
});

// The user already exists with the given data
export const UserAlreadyExists = createError('UserAlreadyExists', {
  message: 'An user already exists with the given data',
});

// The given data is invalid
export const InvalidDataError = createError('InvalidDataError', {
  message: 'The data specified is invalid',
});

// Partner erro
export const PartnerError = createError('InvalidDataError', {
  message: 'CPF, Nome ou Email Já exite',
});

// The data could not be found
export const DataNotFound = createError('DataNotFound', {
  message: 'This data does not exist',
});

export const InvestorDataNotCreated = createError('IvestorDataNotCreated', {
  message: 'The Client does not have a InvestorData',
}); 

// The user does not have a client
export const ClientIsNotCreated = createError('ClientIsNotCreated', {
  message: 'The user does not have a client entry',
});

// The user does not have a client
export const AdminIsNotCreated = createError('AdminIsNotCreated', {
  message: 'The user does not have an admin entry',
});

// Data already exists
export const DataAlreadyExists = createError('DataAlreadyExists', {
  message: 'The data already exists',
});

// SecurityQuestion already exists for the Client
export const SecurityQuestionAlreadyExists = createError('SecurityQuestionAlreadyExists', {
  message: 'SecurityQuestion already exists for this client',
});

// The Client InvestorData already exists
export const InvestorDataAlreadyExists = createError('InvestorDataAlreadyExists', {
  message: 'The Client InvestorData already exists',
});

// The Client SuitabilityQuestionary already exists
export const SuitabilityQuestionaryAlreadyExists = createError('SuitabilityQuestionaryAlreadyExists', {
  message: 'The Client SuitabilityQuestionary already exists',
});

// This Client already has a Partner
export const ClientPartnerAlreadyExists = createError('ClientPartnerAlreadyExists', {
  message: 'This Client already has a Partner',
});

// This Client already has a Questionary Filled
export const ALreadyHasSuitabilityQuestionary = createError('ALreadyHasSuitabilityQuestionary', {
  message: 'This Client already has a Questionary Filled',
});
