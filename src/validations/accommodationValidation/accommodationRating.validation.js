import { accommodationRatingSchema } from './accommodationRating.schema';
import { BaseError } from '../../httpErrors/baseError';

// eslint-disable-next-line import/prefer-default-export
export const accommodationRatingValidation = async (id, req, res, next) => {
  try {
    req.body.accommodationId = parseInt(req.params.id);
    req.body.userId = id;
    const value = await accommodationRatingSchema.validate(req.body);
    if (value.error) {
      throw new BaseError(
        'Bad request',
        400,
        `${value.error.details[0].message}`,
      );
    }
    next(id);
  } catch (err) {
    next(err);
  }
};
