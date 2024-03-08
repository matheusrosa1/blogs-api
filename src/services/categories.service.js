const { Category } = require('../models');

const create = async (name) => {
  const newCategory = await Category.create({ name });
  return {
    status: 'CREATED',
    data: newCategory,
  };
};

module.exports = {
  create,
};