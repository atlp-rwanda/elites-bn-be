import { locationSchema } from './location.schema.js';

export const locationValidation = async (req, res, next) => {
  const value = await locationSchema.validate(req.body);
  if (value.error) {
    res.json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
