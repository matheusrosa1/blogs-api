const blogPostsServices = require('../services/blog_posts.services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const errorMessage = 'Erro interno do servidor.';

const createBlogPost = async (req, res) => {
  const { authorization: bearerToken } = req.headers;
  const token = bearerToken.split(' ')[1];
  try {
    const { title, content, categoryIds } = req.body;
    const { status, data } = await blogPostsServices.createBlogPost(
      { title, content, categoryIds, token },
    );
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: errorMessage });
  }
};

const findAll = async (req, res) => {
  try {
    const { status, data } = await blogPostsServices.findAll();

    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  createBlogPost,
  findAll,
};