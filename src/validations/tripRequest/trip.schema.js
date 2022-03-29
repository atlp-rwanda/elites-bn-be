import joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const tripSchema = joi.object({
  departLocation: joi.number().integer().required().empty().messages({
    'number.base': 'departLocation must be valid',
    'number.empty': 'departLocation is not allowed to be empty',
    'any.required': 'departLocation is required',
  }),

  destinations: joi.required().messages({
    'any.required': 'destinations is required',
  }),

  tripReason: joi.string().required().empty().messages({
    'string.base': 'tripReason must be valid',
    'string.empty': 'tripReason is not allowed to be empty',
    'any.required': 'tripReason is required',
  }),
  rememberMe: joi.string().messages({
    'string.base': 'rememberMe must be valid',
  }),
  passportNumber: joi.string().messages({
    'string.base': 'passportNumber must be valid',
  }),
  address: joi.string().messages({
    'string.base': 'address must be valid',
  }),

  departDate: joi.date().iso().required().empty().messages({
    'date.base': 'departDate must be valid date',
    'date.empty': 'departDate is not allowed to be empty',
    'date.format': 'date format is not correct ISO standard ',
    'any.required': 'departDate is required',
  }),

  returnDate: joi.date().iso().messages({
    'date.base': 'returnDate must be valid date',
    'date.format': 'date format is not correct ISO standard ',
  }),
});
