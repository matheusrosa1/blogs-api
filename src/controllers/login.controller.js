const loginService = require('../services/login.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const serviceResponse = await loginService.login(email, password);
    
    if (serviceResponse.status === 'UNAUTHORIZED') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = {
  login,
};