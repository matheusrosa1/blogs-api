const checkRequireFields = require('../utils/checkRequireFields');

const verifyInputDataIsNotEmpty = (body, requiredFields) => {
  const emptyField = requiredFields.find((field) => body[field] === '');
  if (emptyField) return 'Some required fields are missing';
};

const validateInputData = (req, res, next) => {
  const { body } = req;

  const requiredFields = ['title', 'content', 'categoryIds'];

  const blogPostsError = checkRequireFields(body, requiredFields);
  if (blogPostsError) return res.status(400).json({ message: blogPostsError });

  const emptyInputDataError = verifyInputDataIsNotEmpty(body, requiredFields);
  if (emptyInputDataError) return res.status(400).json({ message: emptyInputDataError });

  next();
};

const validateUpdateInputData = (req, res, next) => {
  const { body } = req;
  const requiredFields = ['title', 'content'];

  const blogPostsError = checkRequireFields(body, requiredFields);
  if (blogPostsError) return res.status(400).json({ message: blogPostsError });

  const emptyInputDataError = verifyInputDataIsNotEmpty(body, requiredFields);
  if (emptyInputDataError) return res.status(400).json({ message: emptyInputDataError });

  next();
};

module.exports = {
  validateInputData,
  validateUpdateInputData,
};