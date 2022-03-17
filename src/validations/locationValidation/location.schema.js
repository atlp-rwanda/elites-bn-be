import joi from 'joi';

export const locationSchema = joi.object({
  locationName: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'location name is not allowed to be empty',
    'any.required': 'location name is required',
  }),
  description: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'location description is not allowed to be empty',
    'any.required': 'location description is required',
  }),
  country: joi.string().max(60).required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.pattern.base': 'country name must be below 60 characters',
    'string.empty': 'country name is not allowed to be empty',
    'any.required': 'country name is required',
  }),
});
