require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const logConfig = {
  level: process.env.LOG_LEVEL || 'info',
  defaultFilename: process.env.LOG_DEFAULT_FILENAME || 'log',
  maxSize: process.env.LOG_MAX_SIZE || '5m',
  maxFiles: process.env.LOG_MAX_FILES || '7d',
};

module.exports = logConfig;
