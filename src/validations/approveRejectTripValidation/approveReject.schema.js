import joi, { string }from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const approvetripSchema = joi.object({

status : joi.string().required().valid('approved'),
approved: joi.string().when('status',{is:'approved' ,then :joi.required()}),
rejected: joi.string().when('status',{is:'rejected' ,then :joi.required()})
});