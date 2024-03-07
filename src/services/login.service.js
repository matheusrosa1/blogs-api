const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const login = async (email, password) => {
  if (!email || !password) {
    return { status: 'UNAUTHORIZED',
      data: { message: 'Some required fields are missing' } };
  }
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return {
      status: 'UNAUTHORIZED',
      data: {
        message: 'Invalid fields',
      },
    };
  }
  const tokenValue = jwtUtil.generateToken({ userId: user.id });

  return { status: 'SUCCESSFUL',
    data: { token: tokenValue,
    },
  };
};

module.exports = {
  login,
};