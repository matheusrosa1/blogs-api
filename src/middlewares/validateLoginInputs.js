const checkRequireFields = require('../utils/checkRequireFields');

const validateLoginInputs = (req, res, next) => {
  const { body } = req;

  const requiredFields = ['displayName', 'email', 'password'];

  const loginError = checkRequireFields(body, requiredFields);
  if (loginError) return res.status(400).json({ message: loginError });

  return next();
};

module.exports = validateLoginInputs;