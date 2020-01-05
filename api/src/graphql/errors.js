  import { createError } from 'apollo-errors';

// Mask any internal errors
export const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred.',
});

export const itemMissingFields = createError('ItemMissingFields', {
  message: 'Missing InternalID, name or tier from item.',
});

export const itemAlreadyExists = createError('ItemAlreadyExists', {
  message: 'This item already exists on database.',
});

export const itemTransactionError = createError('ItemTransactionError', {
  message: 'Something was wrong on save transaction for this item.',
});

export const buildMissingFields = createError('BuildMissingFields', {
  message: 'Missing itemInternalId, rarity, perfectRune or perfectSpirity.',
});

export const buildAlreadyExists = createError('BuildAlreadyExists', {
  message: 'This build with the given rarity already exist.',
});

export const buildTransactionError = createError('BuildTransactionError', {
  message: 'Something was wrong on save transaction for this build.',
});

export const priceMissingFields = createError('PriceMissingFields', {
  message: 'Missing values for create price.',
});

export const priceAlreadyExists = createError('PriceAlreadyExists', {
  message: 'This range of price already exist. Use workCount to make the existent one more relevant',
});

export const priceTransactionError = createError('PriceTransactionError', {
  message: 'Something was wrong on save transaction for this Price.',
});

export const priceWorksCountMissing = createError('PriceWorksCountMissing', {
  message: 'Missing Price ID to increase count.',
});

export const priceWorksCountNotFound  = createError('PriceWorksCountNotFound', {
  message: 'Can not found the given Price',
});