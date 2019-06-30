const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataType) => {
  const CashFlow = sequelize.define(
    'CashFlow',
    {
      type: DataType.STRING,
      description: DataType.STRING,
      date: DataType.DATE,
      categoryId: DataType.INTEGER,
      userId: DataType.INTEGER,
      value: DataType.DOUBLE,
    },
    {
      tableName: 'cash_flow',
      hooks: {
        beforeSave: async cashFlow => {
          const newCashFlow = cashFlow;
          if (!newCashFlow.id) {
            newCashFlow.id = uuidv4();
          }
          if (!newCashFlow.date) {
            newCashFlow.date = new Date();
          }
          return newCashFlow;
        },
      },
    },
  );

  CashFlow.associate = models => {
    CashFlow.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
    CashFlow.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };

  return CashFlow;
};
