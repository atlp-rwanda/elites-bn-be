import models from '../models';
import { generateToken } from '../helpers/jwtFunction';
import { verificationEmail } from '../template/verify-email-template';
import { sendEmail } from './send-email-service';
import dotenv from 'dotenv';
dotenv.config();

export const userExist = async (email) => {
  const User = await models.User.findOne({ where: { email: email } });
  if (User) {
    return User;
  }
  return null;
};

export const createUser = async (user) => {
  const role = await models.Role.findOne({where: {name: 'requester'}})
  const userCreated = await models.User.create({...user, roleId: role.dataValues.id});
  userCreated.save();
  const token = await generateToken({id:userCreated.id});
  const verificationLink = `${process.env.APP_URL}/api/v1/auth/verify?token=${token}`
  
  const email = {to: user.email,
    subject: 'Barefoot verification Email',
    from: process.env.SENDGRID_EMAIL,
    text: `Hello  ${user.names}`,
    html: await verificationEmail(verificationLink),}
    await sendEmail(email)
  return userCreated;
};
