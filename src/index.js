const app = require('./app');
const appConfig = require('./configs/appConfig');
const winstonUtil = require('./utils/winstonUtil');

const logger = winstonUtil('info', 'index');

app.listen(appConfig.port, () => {
  logger.info(
    `Server is running on port: ${appConfig.port} and env: ${appConfig.env}`,
  );
});
