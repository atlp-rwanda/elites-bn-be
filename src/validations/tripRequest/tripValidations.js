/* eslint-disable consistent-return */
import { tripSchema } from './trip.schema';

// eslint-disable-next-line import/prefer-default-export
export const requestValidation = async (req, res, next) => {
  const validate = await tripSchema.validate(req.body);

  // eslint-disable-next-line no-prototype-builtins
  if (!validate || validate.hasOwnProperty('error')) {
    return res.json({ error: validate.error.details[0].message });
  }
  next();
};
