const userService = require('../services/user.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const responseService = await userService.create(displayName, email, password, image);

    return res.status(mapStatusHTTP(responseService.status)).json(responseService.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  create,
};