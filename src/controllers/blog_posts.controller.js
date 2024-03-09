const blogPostsServices = require('../services/blog_posts.services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createBlogPost = async (req, res) => {
  const { authorization: bearerToken } = req.headers;
  const token = bearerToken.split(' ')[1];

  const { title, content, categoryIds } = req.body;
  const { status, data } = await blogPostsServices.createBlogPost(
    { title, content, categoryIds, token },
  );
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createBlogPost,
};