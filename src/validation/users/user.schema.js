import joi from '@hapi/joi';

// eslint-disable-next-line import/prefer-default-export
export const userSchema = joi.object({
  names: joi.string().required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'Names is not allowed to be empty',
    'any.required': 'Names is required',
  }),
  email: joi.string().email().required().messages({
    'string.base':
      'Sorry! It looks like something went wrong. Please try later',
    'string.empty': 'Email address is not allowed to be empty',
    'string.email': 'Enter a valid email address',
    'any.required': 'Email is required',
  }),
  password: joi
    .string()
    .min(4)
    .max(15)
    .pattern(
      // eslint-disable-next-line prefer-regex-literals
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    )
    .required()
    .messages({
      'string.base':
        'Sorry! It looks like something went wrong. Please try later',
      'string.pattern.base':
        'Password must atleast have one special character and a number',
      'string.empty': 'Password is not allowed to be empty',
      'any.required': 'Password is required',
    }),
});
