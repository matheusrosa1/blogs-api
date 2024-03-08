const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'posts_categories',
  })
  return PostCategory;
};

module.exports = PostCategoryModel;