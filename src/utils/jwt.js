const jwt = require('jsonwebtoken');

const SECRET_KEY = 'BLOGSAPI';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, SECRET_KEY, jwtConfig);

const decodeToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
  generateToken,
  decodeToken,
};