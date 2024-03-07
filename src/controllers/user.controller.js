const userService = require('../services/user.service');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const responseService = await userService.create(displayName, email, password, image);

    return res.status(201).json(responseService.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  create,
};