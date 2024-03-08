const route = require('express').Router();
const categoriesController = require('../controllers/categories.controller');

const middlewares = require('../middlewares/index');

const { validateCategory } = require('../middlewares/index');

route.post(
  '/', 
  middlewares.auth,
  validateCategory.validateInputName, 
  categoriesController.create,
);

module.exports = route;