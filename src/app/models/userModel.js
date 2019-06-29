const bcryptUtil = require('../../utils/bcryptUtil');

module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User',
    {
      name: DataType.STRING,
      lastName: DataType.STRING,
      email: DataType.STRING,
      password: DataType.VIRTUAL,
      passwordHash: DataType.STRING,
      statusId: DataType.INTEGER,
    },
    {
      hooks: {
        beforeSave: async user => {
          const newUser = user;
          if (user.password) {
            newUser.passwordHash = await bcryptUtil.hash(user.password);
          }
          return newUser;
        },
      },
    },
  );

  User.associate = models => {
    User.belongsTo(models.Status);
  };

  return User;
};
