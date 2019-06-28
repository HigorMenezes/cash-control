require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const winstonUtil = require('../utils/winstonUtil');

const logger = winstonUtil('info', 'config');

const logConfig = {
  level: process.env.LOG_LEVEL || 'info',
  defaultFilename: process.env.LOG_DEFAULT_FILENAME || 'log',
  maxSize: process.env.LOG_MAX_SIZE || '5m',
  maxFiles: process.env.LOG_MAX_FILES || '7d',
};
logger.info(`logConfig - env: ${process.env.NODE_ENV}`, logConfig);

module.exports = logConfig;
