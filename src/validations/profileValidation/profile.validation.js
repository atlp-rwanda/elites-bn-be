/* eslint-disable consistent-return */
import { profileSchema } from './profile.schema';

// eslint-disable-next-line import/prefer-default-export
export const profileValidation = async (req, res, next) => {
  const validate = await profileSchema.validate(req.body);

  // eslint-disable-next-line no-prototype-builtins
  if (!validate || validate.hasOwnProperty('error')) {
    return res.json({ error: validate.error.details[0].message });
  }
  next();
};
