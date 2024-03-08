const express = require('express');
const loginController = require('./controllers/login.controller');
const userController = require('./controllers/user.controller');
const middlewares = require('./middlewares/index');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', middlewares.auth, userController.getAll);
app.get('/user/:id', middlewares.auth, userController.getById);

app.post('/login', loginController.login);

app.post(
  '/user', 
  middlewares.validateEmail,
  middlewares.validateInputNewUser, 
  userController.create,
);
// ... . .

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
