const loginService = require('../services/login.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const serviceResponse = await loginService.login(email, password);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  login,
};