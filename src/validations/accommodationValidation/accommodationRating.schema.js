import joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const accommodationRatingSchema = joi.object({
  feedback: joi.string().required().messages({
    'string.base': 'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'feedback is not allowed to be empty',
    'any.required': 'feedback is required',
  }),
  rating: joi.number().integer().min(1).max(5)
    .required()
    .messages({
      'number.base': 'Please Enter a valid integer number',
      'number.integer': 'rating should be integer',
      'number.min': 'rating should not be less than 1',
      'number.max': 'rating should not exceed 5',
      'number.empty': 'rating is not allowed to be empty',
      'any.required': 'rating is required',
    }),
  accommodationId: joi.number().required().messages({
    'number.base': 'Please Enter a valid integer number',
    'number.empty': 'accommodation ID is not allowed to be empty',
    'any.required': 'accommodation ID is required',
  }),
  userId: joi.number().required().messages({
    'number.base': 'Please Enter a valid integer number',
    'number.empty': 'user ID is not allowed to be empty',
    'any.required': 'user ID is required',
  }),
});
