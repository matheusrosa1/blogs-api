const checkRequireFields = (receivedFields, requiredFields) => {
  for (let index = 0; index < requiredFields.length; index += 1) {
    const currentField = requiredFields[index];
    if (!(currentField in receivedFields)) {
      return 'Some required fields are missing';
    }
  }
};

module.exports = checkRequireFields;