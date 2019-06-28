require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const logger = require('../utils/winstonUtil')('info', 'config');

const appConfig = {
  port: process.env.APP_PORT || 3030,
  env: process.env.NODE_ENV || 'none',
};
logger.info(`appConfig - env: ${process.env.NODE_ENV}`, appConfig);
module.exports = appConfig;
