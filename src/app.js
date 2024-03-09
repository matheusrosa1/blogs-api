const express = require('express');

const { usersRoutes, loginRoutes, categoriesRoutes, blogPostsRoutes } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', usersRoutes);

app.use('/login', loginRoutes);

app.use('/categories', categoriesRoutes);

app.use('/', blogPostsRoutes);

// ... . .

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
