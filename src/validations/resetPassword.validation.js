import Joi from '@hapi/joi';

export const passwordValidation = (req, res, next) => {
	const passwordSchema = Joi.object({
		password: Joi.string()
			.required()
			.empty()
			.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
			.messages({
				'any.required': '{{#label}} field is required',
				'string.base': '{{#label}} must be of type string',
				'string.empty': '{{#label}} can not be empty',
				'string.pattern.base':
					'{{#label}} must contain at least a number, upper-case letter and longer than 8 characters',
			}),

		confirmPassword: Joi.string().empty().required(),
	});

	const result = passwordSchema.validate(req.body);
	if (result.error) {
		res.status(400).json({
			message: result.error.details[0].message.replace(/["'`]+/g, ''),
		});
	} else {
		next();
	}
};
