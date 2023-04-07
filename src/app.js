const express = require('express');
const usersController = require('./controllers/user.controller');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', usersController.login);

module.exports = app;
