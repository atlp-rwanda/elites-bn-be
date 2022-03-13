import { tripSchema } from './trip.schema.js';

export const requestValidation = async (req, res, next) => {
  const validate = await tripSchema.validate(req.body);

  if (!validate || validate.hasOwnProperty('error')) {
    return res.json({ error: validate.error.details[0].message });
  }
  next();
};
