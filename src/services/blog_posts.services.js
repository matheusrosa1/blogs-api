const { BlogPost, sequelize, Category } = require('../models');

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

const createBlogPost = async ({ title, content, categoryIds }) => {
  try {
    const postId = await sequelize.transaction(async () => {
      const post = await BlogPost.create({ title, content });
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