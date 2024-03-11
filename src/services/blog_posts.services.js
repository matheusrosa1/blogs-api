/* eslint-disable max-lines-per-function */
const { BlogPost, sequelize, Category, PostCategory, User } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { findCategories } = require('./categories.service');

const createPostCategory = async (postId, categoryIds) => {
  const creatingPostCategory = categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
  });
  await Promise.all(creatingPostCategory);
};

const createBlogPost = async ({ title, content, categoryIds, token }) => {
  const { userId } = decodeToken(token);

  try {
    const verifyCategoriesIds = await findCategories(categoryIds);
    if (verifyCategoriesIds.status) return verifyCategoriesIds;
    const postId = await sequelize.transaction(async () => {
      const post = await BlogPost.create({ title, content, userId });
      await createPostCategory(post.id, categoryIds);
      return post.id;
    });

    const postWithCategory = await BlogPost.findByPk(postId);
    
    return { status: 'CREATED', data: postWithCategory };
  } catch (error) {
    return { status: 'INVALID_DATA', data: { message: error.message } };
  }
};

const findAll = async () => {
  const post = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password ' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return {
    status: 'SUCCESSFUL',
    data: post,
  };
};

module.exports = {
  createBlogPost,
  findAll,
};