const { BlogPost, sequelize, Category } = require('../models');
const { decodeToken } = require('../utils/jwt');

const findPostCategories = async (categoryIds) => {
  const createPostCategoryPromises = categoryIds.map(async (categoryId) => {
    await Category.findByPk(categoryId);
  });
  await Promise.all(createPostCategoryPromises);
  if (!createPostCategoryPromises) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'one or more "categoryIds" not found' },
    };
  }
};

const createBlogPost = async ({ title, content, categoryIds, token }) => {
/*   const { authorization: bearerToken } = req.headers;
  const token = bearerToken.split(' ')[1]; */
/*   const decoded = decodeToken(token); */
  const { userId } = decodeToken(token);
  /*   console.log('DECODED', decoded); */

  try {
    const postId = await sequelize.transaction(async () => {
      const post = await BlogPost.create({ title, content, userId });
      await findPostCategories(categoryIds);
      return post.id;
    });

    const postWithCategory = await BlogPost.findByPk(postId);
    
    return { status: 'CREATED', data: postWithCategory };
  } catch (error) {
    return { status: 'INVALID_DATA', data: { message: error.message } };
  }
};

module.exports = {
  createBlogPost,
};