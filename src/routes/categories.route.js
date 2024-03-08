const route = require('express').Router();
const categoriesController = require('../controllers/categories.controller');

const { validateAuth } = require('../middlewares/validateAuth');
const { validateInputName } = require('../middlewares/validateCategories');

route.post(
  '/', 
  validateAuth,
  validateInputName, 
  categoriesController.create,
);

module.exports = route;