import { userSchema} from "./user.schema.js";

export const userValidation = async (req, res, next) => {
    const value = await userSchema.validate(req.body);
    if (value.error) {
        res.json({
            message: value.error.details[0].message
        })
    } else {
        next();
    }
}