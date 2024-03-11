const route = require('express').Router();

const blogPostsController = require('../controllers/blog_posts.controller');
const { validateAuth } = require('../middlewares/validateAuth');
const { validateInputData } = require('../middlewares/validateBlogPosts');

route.post('/', validateAuth, validateInputData, blogPostsController.createBlogPost);

module.exports = route;