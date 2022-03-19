<<<<<<< HEAD
import dotenv from 'dotenv';
import models, { Role } from '../models';
// import { generateToken } from '../helpers/jwtFunction';

=======
import models,{Role} from "../models";
import { generateToken } from "../helpers/jwtFunction";
import dotenv from "dotenv";
>>>>>>>  This is a combination of 11 commits.
dotenv.config();

export const userExist = async (email) => {
  const User = await models.User.findOne({ where: { email: email } });
  if (User) {
    return User;
  }
  return null;
};

<<<<<<< HEAD
export const userById = async (id) => {
  const User = await models.User.findOne({
    where: { id },
    raw: true,
  });
  if (User) {
    return User;
  }
  return null;
};

export const updateUser = async (userId) => {
  const user = await models.User.update(
    { verified: true },
    { where: { id: userId } },
=======
export const updateUser = async (userId) => {
  const user = await models.User.update(
    { verified: true },
    { where: { id: userId } }
>>>>>>>  This is a combination of 11 commits.
  );
  return user;
};

export const createUser = async (user) => {
<<<<<<< HEAD
  const role = await models.Role.findOne({ where: { name: 'requester' } });
  const userCreated = await models.User.create({
    ...user,
    roleId: role.dataValues.id,
=======
  const role = await models.Role.findOne({ where: { name: "requester" } });
  const userCreated = await models.User.create({
    ...user,

>>>>>>>  This is a combination of 11 commits.
  });
  userCreated.save();
  const verificationLink = `${process.env.APP_URL}/api/v1/auth/verify`;

  return userCreated;
};

export const updatedRole = async (newRoleId, email) => {
  const user = await models.User.findOne({ where: { email } });
  const newRole = await Role.findOne({ where: { id: newRoleId } });
  if (newRole == null) {
    return null;
  }
  user.roleId = newRole.id;
  await user.save();
  return user;
<<<<<<< HEAD
};

export const updateUserPassword = async (id, email, updates) => {
  const updatedUser = await models.User.update(updates, {
    where: { id, email },
    returning: true,
    raw: true,
  });
  return updatedUser;
=======
>>>>>>>  This is a combination of 11 commits.
};
export function getUserId(id) {
  return models.User.findOne({ where: { id } });
}
