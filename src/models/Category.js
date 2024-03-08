const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING(255),
  }, {
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });
  return Category;
};

module.exports = CategoryModel;