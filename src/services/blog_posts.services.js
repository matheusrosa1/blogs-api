/* eslint-disable max-lines-per-function */
const { BlogPost, sequelize, Category, User } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { findCategories } = require('./categories.service');
const { createPostCategory } = require('./posts_categories.service');

const createBlogPost = async ({ title, content, categoryIds, token }) => {
  const { userId } = decodeToken(token);
  const verifyCategoriesIds = await findCategories(categoryIds);
  if (verifyCategoriesIds.status) return verifyCategoriesIds;
  const postId = await sequelize.transaction(async () => {
    const post = await BlogPost.create({ title, content, userId });
    await createPostCategory(post.id, categoryIds);
    return post.id;
  });

  const postWithCategory = await BlogPost.findByPk(postId);
    
  return { status: 'CREATED', data: postWithCategory };
};

const findAll = async () => {
  const posts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: 'password ' } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { status: 'SUCCESSFUL', data: posts };
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: 'password ' } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: post };
};

const update = async (id, { title, content, token }) => {
  const { userId } = decodeToken(token);
  /*   console.log(userId); */
  const findPost = await BlogPost.findByPk(id);
  if (findPost.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });

  const findUpdatedPost = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: 'password ' } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { status: 'SUCCESSFUL', data: findUpdatedPost };
};

const remove = async (id, { token }) => {
  const { userId } = decodeToken(token);
  const findPost = await BlogPost.findByPk(id);
  if (findPost.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  if (!findPost) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  const wasRemoved = await BlogPost.destroy(
    { where: { id } },
  );
  return { status: 'NOT_CONTENT' }; // tem que ajustar essa parte, só deve ser retornado um status, sem data
};

module.exports = { createBlogPost, findAll, findById, update, remove };