const app = require('./app');
const appConfig = require('./configs/appConfig');
const logger = require('./utils/winstonUtil')('info', 'index');

app.listen(process.env.PORT || appConfig.port, () => {
  logger.info(
    `Server is running on port: ${appConfig.port} and env: ${appConfig.env}`,
  );
});
