const route = require('express').Router();

const usersController = require('../controllers/users.controller');

const middlewares = require('../middlewares/index');

route.get('/', middlewares.auth, usersController.getAll);
route.get('/:id', middlewares.auth, usersController.getById);
route.post(
  '/', 
  middlewares.validateEmail,
  middlewares.validateInputNewUser, 
  usersController.create,
);

module.exports = route;