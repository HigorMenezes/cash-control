const app = require('./app');
const appConfig = require('./configs/appConfig');
const logger = require('./utils/winstonUtil')('info', 'index');

app.listen(appConfig.port, () => {
  logger.info(
    `Server is running on port: ${appConfig.port} and env: ${appConfig.env}`,
  );
});

// const { CashFlow } = require('./app/models');

// const findAllCash = async (userId, type) => {
//   try {
//     const queryResult = await CashFlow.findAll({
//       where: { type, userId },
//       raw: true,
//     });
//     let result = { value: 0.0 };
//     if (queryResult.length > 0) {
//       result = queryResult.reduce(({ value }, current) => {
//         return { value: value + current.value };
//       });
//     }
//     return result.value;
//   } catch (err) {
//     logger.error('findAllCash - Error during find all CashIn', err);
//     throw err;
//   }
// };

// findAllCash(4, 'cash-out')
//   .then(console.log)
//   .catch(console.log);
