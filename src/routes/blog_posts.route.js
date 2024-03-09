const route = require('express').Router();

const blogPostsController = require('../controllers/blog_posts.controller');
const { validateAuth } = require('../middlewares/validateAuth');

route.post('/', validateAuth, blogPostsController.createBlogPost);

module.exports = route;