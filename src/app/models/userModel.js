const bcrypt = require('bcrypt');

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
            newUser.passwordHash = await bcrypt.hash(user.password, 8);
          }
          return newUser;
        },
      },
    },
  );

  User.associate = models => {
    User.hasOne(models.Status);
  };

  return User;
};
