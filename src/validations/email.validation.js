/* eslint-disable import/prefer-default-export */
import joi from '@hapi/joi';
import { BaseError } from '../httpErrors/baseError';

export const emailValidation = (req, res, next) => {
  try {
    const emailSchema = joi.object({
      email: joi.string().email().required().messages({
        'string.base':
          'Sorry! It looks like something went wrong. Please try later',
        'string.empty': 'Email address is not allowed to be empty',
        'string.email': 'Enter a valid email address',
        'any.required': 'Email is required',
      }),
    });
    const result = emailSchema.validate(req.body);
    if (result.error) {
      throw new BaseError(
        'Bad request',
        400,
        `${result.error.details[0].message.replace(/["'`]+/g, '')}`
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
