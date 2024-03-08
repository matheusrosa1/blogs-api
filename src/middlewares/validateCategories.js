const validateInputName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  return next();
};

module.exports = {
  validateInputName,
};