<<<<<<< HEAD
/* eslint-disable consistent-return */
=======
>>>>>>>  This is a combination of 11 commits.
import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const roleValidate = (req, res, next) => {
  const roleValidation = Joi.object({
    email: Joi.string().required().email(),

  });
  const result = roleValidation.validate(req.body, req.params.id);

  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message.replace(/["'`]+/g, '') });
  }
  next();
};
