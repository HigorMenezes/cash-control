const app = require('./app');
const appConfig = require('./configs/appConfig');
const logger = require('./utils/winstonUtil')('info', 'index');

app.listen(appConfig.port, () => {
  logger.info(
    `Server is running on port: ${appConfig.port} and env: ${appConfig.env}`,
  );
});
