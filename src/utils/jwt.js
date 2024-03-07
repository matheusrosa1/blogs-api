const jwt = require('jsonwebtoken');

/* const SECRET_KEY = 'JWT_SECRET'; */

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  decodeToken,
};