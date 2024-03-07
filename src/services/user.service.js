const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const create = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  const tokenValue = jwtUtil.generateToken({ userId: user.id });

  return { status: 'SUCCESSFUL',
    data: { token: tokenValue,
    },
  };
};

module.exports = {
  create,
};