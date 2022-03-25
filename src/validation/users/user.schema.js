import joi from '@hapi/joi';

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
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
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
