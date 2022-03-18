import joi from 'joi';

export const accommodationSchema = joi.object({
  accommodationName: joi.string().max(100).required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.pattern.base': 'accommodation name must be below 100 characters',
    'string.empty': 'accommodation name is not allowed to be empty',
    'any.required': 'accommodation name is required',
  }),
  description: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'description is not allowed to be empty',
    'any.required': 'description is required',
  }),
  streetAddress: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'street Address is not allowed to be empty',
    'any.required': 'street Address is required',
  }),
  amenities: joi.string().messages({
    'string.base': 'Enter a valid string',
  }),
  geoCoordinates: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'latitude or longitute is not allowed to be empty',
    'any.required': 'latitude or longitute is required',
  }),
  approvalStatus: joi.string().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'status is not allowed to be empty',
  }),
  locationId: joi.number().required().messages({
    'number.base': 'Please Enter a valid integer number',
    'number.empty': 'location ID is not allowed to be empty',
    'any.required': 'location ID is required',
  }),
  userId: joi.number().messages({
    'number.base': 'Please Enter a valid integer number',
    'number.empty': 'user ID is not allowed to be empty',
  }),
});
