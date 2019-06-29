const statusModel = (Sequelize, DataType) => {
  const Status = Sequelize.define(
    'Status',
    {
      name: DataType.STRING,
      description: DataType.STRING,
    },
    {
      tableName: 'Status',
    },
  );

  return Status;
};

module.exports = statusModel;
