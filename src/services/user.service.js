const { User } = require('../models');

const getAll = async (email) => {
  const [data] = await User.findAll({
    where: { email },
  });
  return data;
};

module.exports = {
    getAll,
};