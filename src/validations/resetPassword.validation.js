/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import { BaseError } from '../httpErrors/baseError';

export const passwordValidation = (req, res, next) => {
  try {
    const passwordSchema = Joi.object({
      password: Joi.string()
        .required()
        .empty()
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
          'any.required': '{{#label}} field is required',
          'string.base': '{{#label}} must be of type string',
          'string.empty': '{{#label}} can not be empty',
          'string.pattern.base':
            '{{#label}} must contain at least a number, upper-case letter, special character and not less than 8 characters',
        }),

      confirmPassword: Joi.string().empty().required(),
    });

    const result = passwordSchema.validate(req.body);
    if (result.error) {
      throw new BaseError(
        'Bad request',
        400,
        `${result.error.details[0].message.replace(/["'`]+/g, '')}`,
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
