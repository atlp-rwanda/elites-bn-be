import models from '../models';

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

export const createArticles = async (article) => {
  const articleCreated = await models.article.create(article);
  articleCreated.save();
  return articleCreated;
};
