import models from '../models';

import { checkRole } from './tripServices';

export const fetchData = async (userid) => {
  const data = await models.User.findOne({
    where: {
      id: userid,
    },
    attributes: {
      exclude: [
        'id',
        'isActive',
        'createdAt',
        'password',
        'updatedAt',
        'verified',
      ],
    },
  });

  return data;
};

export const isExist = async (userId) => {
  const data = await models.Profile.findOne({ where: { userId } });
  if (!data) {
    return false;
  }
  return data;
};

export const createProfile = async (userid, data) => {
  try {
    const hasOne = await isExist(userid);

    if (!hasOne) {
      const addProfile = await models.Profile.create({
        ...data,
        userId: userid,
      });
      addProfile.save();
      return addProfile;
    }
    return false;
  } catch (err) {
    throw new Error('something went wrong');
  }
};

export const getAllProfiles = async (userid) => {
  const role = await checkRole(userid);
  if (role === 'admin') {
    const data = await models.Profile.findAll({
      include: [
        {
          model: models.User,
          as: 'User',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
        {
          model: models.Location,
          as: 'Location',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'locationName', 'description'],
          },
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'userId',
          'name',
          'email',
          'manager',
          'role',
          'residence',
        ],
      },
    });

    return data;
  }

  if (role === 'manager') {
    const managerProfile = await models.Profile.findOne({
      where: { userId: userid },
      include: [
        {
          model: models.User,
          as: 'User',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
        {
          model: models.Location,
          as: 'Location',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'locationName', 'description'],
          },
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'userId',
          'name',
          'email',
          'manager',
          'role',
          'residence',
        ],
      },
    });
    const data = await models.Profile.findAll({
      where: { manager: userid },
      include: [
        {
          model: models.User,
          as: 'User',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        },
        {
          model: models.Location,
          as: 'Location',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'locationName', 'description'],
          },
        },
      ],
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'userId',
          'name',
          'email',
          'manager',
          'role',
          'residence',
        ],
      },
    });

    return { data, managerProfile };
  }
};

export const getSingleProfile = async (id) => {
  const profile = await models.Profile.findOne({
    where: { id },
    include: [
      {
        model: models.User,
        as: 'User',
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
      },
      {
        model: models.Location,
        as: 'Location',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'locationName', 'description'],
        },
      },
    ],
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'userId',
        'name',
        'email',
        'manager',
        'role',
        'residence',
      ],
    },
  });
  return profile;
};

export const updateProfile = async (id, data) => {
  const exist = await isExist(id);
  if (exist) {
    exist.name = data.name ? data.name : exist.name;
    exist.gender = data.gender ? data.gender : exist.gender;
    exist.birthdate = data.birthdate ? data.birthdate : exist.birthdate;
    exist.language = data.language ? data.language : exist.language;
    exist.currency = data.currency ? data.currency : exist.currency;
    exist.residence = data.residence ? data.residence : exist.residence;
    exist.department = data.department ? data.department : exist.department;
    exist.picture = data.picture ? data.picture : exist.picture;
    const updatedProfile = await exist.save();
    return updatedProfile;
  }
};

export const deleteprofile = async (userId) => {
  const checkExist = await isExist(userId);

  if (checkExist) {
    const Data = await models.Profile.destroy({
      where: {
        userId,
      },
    });
    return true;
  }

  return null;
};
