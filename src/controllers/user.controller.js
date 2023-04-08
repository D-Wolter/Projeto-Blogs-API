const jwt = require('jsonwebtoken');
const usersService = require('../services/users.service');

const secret = process.env.JWT_SECRET;

const isBodyValid = (username, password) => username && password;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;    

    const response = await usersService.getAllUser(email);

    if (!isBodyValid(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    if (!response || response.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ data: { user: response.id } }, secret, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await usersService.createUser({ displayName, email, password, image });

    const token = jwt.sign({ data: { user: user.id } }, secret, {
      expiresIn: '1h',
    });
    res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
    login,
    createUser,
};