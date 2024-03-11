/* eslint-disable max-lines-per-function */
const { BlogPost, sequelize, Category, User } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { findCategories } = require('./categories.service');
const { createPostCategory } = require('./posts_categories.service');

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
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: 'password ' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: 'password ' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: post };
};

module.exports = {
  createBlogPost,
  findAll,
  findById,
};