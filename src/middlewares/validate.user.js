const usersService = require('../services/users.service');

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  
  const user = await usersService.getAllUser(email);
  
  if (user) return res.status(409).json({ message: 'User already registered' });

  return next();
};

module.exports = validateUser;