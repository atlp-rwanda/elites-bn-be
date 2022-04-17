/* eslint-disable consistent-return */
import { tripstatsSchema } from './tripstats.schema';

// eslint-disable-next-line import/prefer-default-export
export const requestValidationStats = async (req, res, next) => {
  const validate = await tripstatsSchema.validate(req.body);

  // eslint-disable-next-line no-prototype-builtins
  if (!validate || validate.hasOwnProperty('error')) {
    return res.json({ error: validate.error.details[0].message });
  }
  next();
};
