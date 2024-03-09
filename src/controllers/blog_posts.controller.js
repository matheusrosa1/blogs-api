const blogPostsServices = require('../services/blog_posts.services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { status, data } = await blogPostsServices.createBlogPost({ title, content, categoryIds });
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createBlogPost,
};