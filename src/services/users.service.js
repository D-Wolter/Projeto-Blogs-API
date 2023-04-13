const { User } = require('../models');

const getAllUser = async (email) => {
  const [data] = await User.findAll({
    where: { email },
  });
  return data;
};

const createUser = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getByIdUser = async (id) => {
  const [users] = await User.findAll({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return users;
};

const removeUser = async (id) => {
  await User.destroy({ where: { id } });
  return { message: 'User deleted' };
};

module.exports = {
    getAllUser,
    createUser,
    getAllUsers,
    getByIdUser,
    removeUser,
};