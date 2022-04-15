import { BlacklistedTokenService } from '../services/blacklistedTokenService';
// eslint-disable-next-line import/prefer-default-export
export class Authentication {
  static async logout(id,req, res,next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const blacklistedToken = await BlacklistedTokenService.create({
        token,
      });
      return res.status(201).json({
        status: '200',
        message: 'Token blacklisted',
        payload: blacklistedToken,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
}
