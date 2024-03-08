const route = require('express').Router();

const usersController = require('../controllers/users.controller');

const { validateAuth } = require('../middlewares/validateAuth');
const { validateEmail, validateInputsNewUser } = require('../middlewares/validateUsers');

route.get('/', validateAuth, usersController.getAll);
route.get('/:id', validateAuth, usersController.getById);
route.post(
  '/', 
  validateEmail,
  validateInputsNewUser, 
  usersController.create,
);

module.exports = route;