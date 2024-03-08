const route = require('express').Router();

const loginController = require('../controllers/login.controller');

route.post('/', loginController.login);

module.exports = route;