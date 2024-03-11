const checkRequireFields = require('../utils/checkRequireFields');

const verifyInputDataIsNotEmpty = (body) => {
  if (body.title === '' || body.content === '' || body.categoryIds.length < 1) {
    return 'Some required fields are missing';
  }
};

const validateInputData = (req, res, next) => {
  const { body } = req;

  const requiredFields = ['title', 'content', 'categoryIds'];

  const blogPostsError = checkRequireFields(body, requiredFields);
  if (blogPostsError) return res.status(400).json({ message: blogPostsError });

  const emptyInputDataError = verifyInputDataIsNotEmpty(body);
  if (emptyInputDataError) return res.status(400).json({ message: emptyInputDataError });

  next();
};

module.exports = {
  validateInputData,
};