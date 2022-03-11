import joi from "joi";

export const tripSchema = joi.object({
    managerId: joi.number().integer().required().empty().messages({
        "number.base": "managerId must be valid",
        "number.empty": "managerId is not allowed to be empty",
        "any.required": "managerId is required",
    }),

    departLocation: joi.number().integer().required().empty().messages({
        "number.base": "departLocation must be valid",
        "number.empty": "departLocation is not allowed to be empty",
        "any.required": "departLocation is required",
    }),

    arrivalLocation: joi.number().integer().required().empty().messages({
        "number.base": "arrivalLocation must be valid",
        "number.empty": "arrivalLocation is not allowed to be empty",
        "any.required": "arrivalLocation is required",
    }),

    tripReason: joi.string().required().empty().messages({
        "string.base": "tripReason must be valid",
        "string.empty": "tripReason is not allowed to be empty",
        "any.required": "tripReason is required",
    }),

    departDate: joi.date().iso().required().empty().messages({
        "date.base": "departDate must be valid date",
        "date.empty": "departDate is not allowed to be empty",
        "date.format": "date format is not correct ISO standard ",
        "any.required": "departDate is required",
    }),

    returnDate: joi.date().iso().messages({
        "date.base": "returnDate must be valid date",
        "date.format": "date format is not correct ISO standard ",
    }),

    travelId: joi.number().integer().required().empty().messages({
        "number.base": "travelId must be valid",
        "number.empty": "travelId is not allowed to be empty",
        "any.required": "travelId is required",
    }),

    accomodationId: joi.number().integer().required().empty().messages({
        "number.base": "accomodationId must be valid",
        "number.empty": "accomodationId is not allowed to be empty",
        "any.required": "accomodationId is required",
    }),

    status: joi.string().messages({
        "string.base": " status must be valid",

    }),
});