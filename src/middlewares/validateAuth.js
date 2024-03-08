const jwtUtil = require('../utils/jwt');
const { User } = require('../models');

const validateAuth = async (req, res, next) => {
  const { authorization: bearerToken } = req.headers;
  console.log(bearerToken);

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = jwtUtil.decodeToken(token);

    const user = await User.findByPk(decoded.userId);

    req.user = user.dataValues;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateAuth };