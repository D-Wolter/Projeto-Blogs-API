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

module.exports = {
    getAllUser,
    createUser,
};