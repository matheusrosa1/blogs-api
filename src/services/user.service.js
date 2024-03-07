const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const create = async ({ displayName, email, password, image }) => {
/*   const foundUserByEmail = User.findOne({ where: { email } }); */

  /*   if (foundUserByEmail) {
    return {
      status: 'CONFLICT',
      data: {
        message: 'User already registered',
      },
    };
  } */

  const newUser = await User.create({ displayName, email, password, image });

  const tokenValue = jwtUtil.generateToken({ userId: newUser.id });

  return { status: 'SUCCESSFUL',
    data: { token: tokenValue,
    },
  };
};

module.exports = {
  create,
};