/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const profileSchema = joi.object({
  gender: joi.string().required().empty().messages({
    'string.base': 'gender must be valid',
    'string.empty': 'gender is not allowed to be empty',
    'any.required': 'gender is required',
  }),

  birthdate: joi.date().iso().required().empty()
    .messages({
      'date.base': 'birthdate must be valid date',
      'date.empty': 'birthdate is not allowed to be empty',
      'date.format': 'date format is not correct ISO standard ',
      'any.required': 'birthdate is required',
    }),

  language: joi.string().required().empty().messages({
    'string.base': 'language must be valid',
    'string.empty': 'language is not allowed to be empty',
    'any.required': 'language is required',
  }),

  currency: joi.string().required().empty().messages({
    'string.base': 'currency must be valid',
    'string.empty': 'currency is not allowed to be empty',
    'any.required': 'currency is required',
  }),

  residence: joi.number().integer().required().empty()
    .messages({
      'number.base': 'residence must be valid',
      'number.empty': 'residence is not allowed to be empty',
      'any.required': 'residence is required',
    }),

  department: joi.string().required().empty().messages({
    'string.base': 'department must be valid',
    'string.empty': 'department is not allowed to be empty',
    'any.required': 'department is required',
  }),
});
