const categoriesServices = require('../services/categories.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const errorMessage = 'Erro interno do servidor.';

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { status, data } = await categoriesServices.create(name);
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  create,
};