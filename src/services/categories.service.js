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

module.exports = {
  create,
  findAll,
};