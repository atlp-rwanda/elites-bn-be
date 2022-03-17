import { roomSchema } from './room.schema.js';

export const roomValidation = async (req, res, next) => {
  const value = await roomSchema.validate(req.body);
  if (value.error) {
    res.json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
