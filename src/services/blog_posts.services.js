/* eslint-disable max-lines-per-function */
const { BlogPost, sequelize, Category } = require('../models');
const { decodeToken } = require('../utils/jwt');

const findCategories = async (categoryIds) => {
  const findPostCategoryPromises = categoryIds.map(async (categoryId) => {
    const dataValues = await Category.findByPk(categoryId);
    return dataValues;
  });
  const categories = await Promise.all(findPostCategoryPromises);
  const verifyNotExistCategory = categories.some((category) => category === null); // retorna um true ou false, caso seja true, alguma das categorias informadas não foram encontradas no banco de dados.
  
  if (verifyNotExistCategory) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'one or more "categoryIds" not found' },
    };
  }
  return verifyNotExistCategory;
};

/* const createPostCategory = async (postId, categoryId) => {

} */

const createBlogPost = async ({ title, content, categoryIds, token }) => {
  const { userId } = decodeToken(token);

  try {
    const verifyCategoriesIds = await findCategories(categoryIds);
    if (verifyCategoriesIds.status) return verifyCategoriesIds;
    const postId = await sequelize.transaction(async () => {
      const post = await BlogPost.create({ title, content, userId });
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