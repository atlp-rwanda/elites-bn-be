

import { USER_EXIST, USER_REGISTERED, USER_NOT_EXIST} from '../constants/user-constants';


import { hashPassword } from '../helpers/passwordSecurity';
import { userExist, createUser,updatedRole } from '../services/userServices.js';
export class UserControllers {
  async registerUser(req, res) {
    try {
      // Check if user exists
      const exist = await userExist(req.body.email);
      if (exist) {
        res.status(409).json({ status: 409, message: USER_EXIST, payload: '' });
      } else {
        req.body.password = await hashPassword(req.body.password)
        const createdUser = await createUser(req.body);
        res.status(201).json({ status: 201, message: USER_REGISTERED, payload: createdUser });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal server error! ' });
    }
  }
  


  async updateRole(req, res) {
    try {
      const email = req.body.email;
      const role = req.body.role;
      const user = await userExist(email);

      if (user == null) {
        res.status(400).json({ message: "User does not exist! " });
        return false;
      } else {
        const updatedUser = await updatedRole(role, email)
        return res.status(200).json({ message:updatedUser})
        }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  }
}
