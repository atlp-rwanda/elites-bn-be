import { accommodationSchema } from './accommodation.schema';
import { BaseError } from '../../httpErrors/baseError';

// eslint-disable-next-line import/prefer-default-export
export const accommodationValidation = async (req, res, next) => {
  try {
    const value = await accommodationSchema.validate(req.body);
    if (value.error) {
      throw new BaseError(
        'Bad request',
        400,
        `${value.error.details[0].message}`,
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
