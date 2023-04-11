const express = require('express');
const verifyJwt = require('./auth/verify-jwt');
const usersController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const blogPostController = require('./controllers/blogPost.controller');
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
app.post('/categories', categoryController.createCategory);
app.get('/categories', categoryController.getAllCategories);
app.post('/post', blogPostController.createPost);
app.get('/post', blogPostController.allPosts);
app.get('/post/:id', blogPostController.postById);

module.exports = app;
