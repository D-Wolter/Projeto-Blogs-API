const express = require('express');
const usersController = require('./controllers/user.controller');
const validateUser = require('./middlewares/validate.user');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', usersController.login);
app.post('/user', validateUser, usersController.createUser);

module.exports = app;
