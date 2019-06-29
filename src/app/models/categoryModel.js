const categoryModel = (sequelize, DataType) => {
  const Category = sequelize.define('Category', {
    name: DataType.STRING,
    userId: DataType.INTEGER,
  });

  Category.associate = models => {
    Category.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
  };

  return Category;
};

module.exports = categoryModel;
