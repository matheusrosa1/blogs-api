const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

/*   User.associate = (models) => {
    User.hasToMany(models.)
  }
 */
  return User;
}

module.exports = UserModel;