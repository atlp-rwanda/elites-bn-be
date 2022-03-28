import joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const roomSchema = joi.object({
  roomType: joi.string().max(20).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.pattern.base': 'room type must be below 20 characters',
    'string.empty': 'room type is not allowed to be empty',
    'any.required': 'room is required',
  }),
  roomNumber: joi.string().required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'room number is not allowed to be empty',
    'any.required': 'room number is required',
  }),
  price: joi.number().required().messages({
    'number.base':
      'Sorry! It looks like something went wrong. Please try later',
    'number.empty': 'price is not allowed to be empty',
    'any.required': 'price is required',
  }),
  currency: joi.string().max(10).required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.pattern.base': 'currency must be below 10 characters',
    'string.empty': 'currency is not allowed to be empty',
    'any.required': 'currency is required',
  }),
  isAvailable: joi.boolean().messages({
    'boolean.base': 'availabilty status has to be true or false ',
    'string.empty': 'availabilty status is not allowed to be empty',
  }),
  accommodationId: joi.number().required().messages({
    'number.base':
      'Sorry! It looks like something went wrong. Please try later',
    'number.empty': 'accommodation ID is not allowed to be empty',
    'any.required': 'accommodation ID is required',
  }),
});
