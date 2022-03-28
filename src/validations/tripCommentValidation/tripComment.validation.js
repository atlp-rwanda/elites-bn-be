import { tripCommentSchema } from './tripComment.schema';

export const tripCommentValidation = async (req, res, next) => {
  const { id } = req.params;
  const value = await roomSchema.validate({ ...req.body, id });
  if (value.error) {
    res.json({
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};
