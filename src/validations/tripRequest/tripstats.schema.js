import joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const tripstatsSchema = joi.object({
  startDate: joi.date().iso().required().empty().messages({
    'date.base': 'startDate must be valid date',
    'date.empty': 'startDate is not allowed to be empty',
    'date.format': 'date format is not correct ISO standard ',
    // 'any.required': 'startDate is required',
  }),

  endDate: joi.date().iso().required().messages({
    'date.base': 'endDate must be valid date',
    'date.format': 'date format is not correct ISO standard ',
  }),
});
