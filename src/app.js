const express = require('express');
const verifyJwt = require('./auth/verify-jwt');
const usersController = require('./controllers/user.controller');
const validateUser = require('./middlewares/validate.user');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', usersController.login);
app.post('/user', validateUser, usersController.createUser);

app.use(verifyJwt);

app.get('/user', usersController.getAllUsers);
app.get('/user/:id', usersController.getByIdUser);

module.exports = app;
