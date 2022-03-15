import Joi from '@hapi/joi';

export const userValidation = (req, res, next) => {
  const userSchema = Joi.object({
    username: Joi.string().empty(),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .messages({
        'any.required': '{{#label}} field is required',
        'string.base': '{{#label}} must be of type string',
        'string.empty': '{{#label}} can not be empty',
        'string.pattern.base':
            '{{#label}} must contain at least a number, upper-case letter and longer than 8 characters'
      }),
    
    email: Joi.string().required().email(),

  });

  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).json({
      message: result.error.details[0].message.replace(/["'`]+/g, '')
    });
  } else {
    next();
  }
};
