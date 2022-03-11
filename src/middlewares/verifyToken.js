import 'dotenv/config';
import { isAccessTokenBlacklisted } from '../helpers/logoutHelper';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    isTokenInvalid = await isAccessTokenBlacklisted(token)
    if (isTokenInvalid) {
        return res.status(401).json({
            status: 401,
            error: 'You are not authorized, Please login'
        });
    }else{
        next()
    }
}
