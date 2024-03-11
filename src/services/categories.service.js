const { Category } = require('../models');

const create = async (name) => {
  const newCategory = await Category.create({ name });
  return {
    status: 'CREATED',
    data: newCategory,
  };
};

const findAll = async () => {
  const categories = await Category.findAll();
  return {
    status: 'SUCCESSFUL',
    data: categories,
  };
};

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

module.exports = {
  create,
  findAll,
  findCategories,
};