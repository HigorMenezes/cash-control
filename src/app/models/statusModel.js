const statusModel = (Sequelize, DataType) => {
  const status = Sequelize.define(
    'Status',
    {
      name: DataType.STRING,
      description: DataType.STRING,
    },
    {
      tableName: 'Status',
    },
  );

  return status;
};

module.exports = statusModel;
