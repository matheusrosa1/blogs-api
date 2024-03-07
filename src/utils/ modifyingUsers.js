const modifyingUsers = async (users) => {
  const modifiedUsers = await users.map((user) => ({
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  }));
  return modifiedUsers;
};

module.exports = modifyingUsers;