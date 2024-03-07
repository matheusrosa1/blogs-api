const { User } = require('../models');
const modifyingUsers = require('../utils/ modifyingUsers');
const jwtUtil = require('../utils/jwt');

const findAll = async () => {
  const users = await User.findAll();

  const modifiedUsers = await modifyingUsers(users);

  return { status: 'SUCCESSFUL', data: { modifiedUsers } };
};

const findById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } }; 
  }

  return { status: 'SUCCESSFUL', data: { user } };
};

const create = async (displayName, email, password, image) => {
  const foundUserByEmail = await User.findOne({ where: { email } });

  if (foundUserByEmail) {
    return {
      status: 'CONFLICT', data: { message: 'User already registered' },
    };
  }
 
  const newUser = await User.create({ displayName, email, password, image });

  const tokenValue = jwtUtil.generateToken({ userId: newUser.id });

  return { status: 'CREATED', data: { token: tokenValue } };
};

module.exports = {
  create,
  findAll,
  findById,
};