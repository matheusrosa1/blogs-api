const express = require('express');
const loginController = require('./controllers/login.controller');
const usersController = require('./controllers/users.controller');
const middlewares = require('./middlewares/index');
const { usersRoutes } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', usersRoutes);

/* app.get('/user', middlewares.auth, usersController.getAll);
app.get('/user/:id', middlewares.auth, usersController.getById);
 */
app.post('/login', loginController.login);

/* app.post(
  '/user', 
  middlewares.validateEmail,
  middlewares.validateInputNewUser, 
  usersController.create,
); */
// ... . .

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
