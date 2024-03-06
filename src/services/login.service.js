const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return {
      status: 'UNAUTHORIZED',
      data: {
        message: 'Invalid fields',
      },
    };
  }

  const token = jwtUtil.generateToken({ userId: user.id });

  return token;
};

module.exports = {
  login,
};