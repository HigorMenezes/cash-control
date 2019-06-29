const bcryptUtil = require('../../utils/bcryptUtil');
const jwtUtil = require('../../utils/jwtUtil');

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

  User.prototype.checkPassword = async function checkPassword(password) {
    const result = await bcryptUtil.compare(password, this.passwordHash);
    return result;
  };

  User.prototype.generateToken = function generateToken() {
    const result = jwtUtil.sign(this.id);
    return result;
  };

  return User;
};
