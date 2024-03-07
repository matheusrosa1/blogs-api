const { User } = require('../models');
const jwtUtil = require('../utils/jwt');

const findAll = async () => {
  const users = await User.findAll();

  const modifiedUsers = users.map((user) => ({
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  }));

  return {
    status: 'SUCCESSFUL',
    data: {
      modifiedUsers,
    },
  };
};

const create = async (displayName, email, password, image) => {
  const foundUserByEmail = await User.findOne({ where: { email } });

  if (foundUserByEmail) {
    return {
      status: 'CONFLICT',
      data: {
        message: 'User already registered',
      },
    };
  }
 
  const newUser = await User.create({ displayName, email, password, image });

  const tokenValue = jwtUtil.generateToken({ userId: newUser.id });

  return { status: 'CREATED',
    data: { token: tokenValue,
    },
  };
};

module.exports = {
  create,
  findAll,
};