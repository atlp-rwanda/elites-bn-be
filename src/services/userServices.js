import { Users } from '../models';

// const { Users } = model;
// console.log(Users)
export const userExist = async (email) => {
  const User = await Users.findOne({ where: { email: 'email' } });
  if (User) {
    return User;
  }
  return false;
};

export const createUser = async (User) => {
  const userCreated = await Users.create(User);
  userCreated.save();
  return userCreated;
};
