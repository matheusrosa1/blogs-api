const { PostCategory } = require('../models');

const createPostCategory = async (postId, categoryIds) => {
  const creatingPostCategory = categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
  });
  await Promise.all(creatingPostCategory);
};

module.exports = {
  createPostCategory,
};