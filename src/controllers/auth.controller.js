import { blacklistAccessToken } from '../helpers/logoutHelper';
export class Authentication {
  static async logout(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      await blacklistAccessToken(token);
      res.status(200).json({
        message: 'Token blacklisted',
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
}
