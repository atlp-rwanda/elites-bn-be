import models,{Role} from "../models";


export const userExist = async (email) => {
  const User = await models.User.findOne({
    where: { email },
    include: [{ model: models.Role, attributes: ['id', 'name'] }],
    raw: true,
  });
  if (User) {
    return User;
  }
  return null;
};

export const createUser = async (user) => {
  const role = await models.Role.findOne({ where: { name: 'requester' } });
  const userCreated = await models.User.create({ ...user, roleId: role.dataValues.id });
  userCreated.save();
  return userCreated;
};



export const updatedRole = async (newRoleId, email) => {
  const user = await models.User.findOne({where:{email}})
  const newRole = await Role.findOne({where:{id:newRoleId}})
  if(newRole ==null){
    return null
  }
  user.roleId = newRole.id;
  await user.save()

  return user

};
