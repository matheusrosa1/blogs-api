const route = require('express').Router();

const blogPostsController = require('../controllers/blog_posts.controller');
const { validateAuth } = require('../middlewares/validateAuth');
const { validateInputData, validateUpdateInputData } = require('../middlewares/validateBlogPosts');

route.post('/', validateAuth, validateInputData, blogPostsController.createBlogPost);

route.get('/', validateAuth, blogPostsController.findAll);
route.get('/:id', validateAuth, blogPostsController.findById);
route.put('/:id', validateAuth, validateUpdateInputData, blogPostsController.update);
route.delete('/:id', validateAuth, blogPostsController.remove);

module.exports = route;