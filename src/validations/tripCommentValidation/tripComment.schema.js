import joi from 'joi';

export const tripCommentSchema = joi.object({

  comment: joi.string().required().messages({
    'string.base':
			'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'comment is not allowed to be empty',
    'any.required': 'comment is required',
  }),
  id: joi.number().required().messages({
    'number.base':
			'Sorry! It looks like something went wrong. Please try later',
    'number.empty': 'trip id is not allowed to be empty',
    'any.required': 'trip id is required',
  }),
});
