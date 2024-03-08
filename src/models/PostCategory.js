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
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      primaryKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      primaryKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory,
      as: 'posts',
    });
  }
  return PostCategory;
};

module.exports = PostCategoryModel;