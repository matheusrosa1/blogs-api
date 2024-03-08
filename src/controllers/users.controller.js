const usersService = require('../services/users.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const errorMessage = 'Erro interno do servidor.';

const getAll = async (_req, res) => {
  try {
    const { status, data } = await usersService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: errorMessage });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await usersService.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);    
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: errorMessage });
  }
};

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const responseService = await usersService.create(displayName, email, password, image);

    return res.status(mapStatusHTTP(responseService.status)).json(responseService.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};