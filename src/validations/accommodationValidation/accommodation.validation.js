import { accommodationSchema } from './accommodation.schema.js';

export const accommodationValidation = async (req, res, next) => {
  const value = await accommodationSchema.validate(req.body);
  if (value.error) {
    res.json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
