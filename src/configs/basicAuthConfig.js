require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const logger = require('../utils/winstonUtil')('info', 'config');

const basicAuthConfig = {
  username: process.env.BASIC_AUTH_USERNAME || 'admin',
  password: process.env.BASIC_AUTH_PASSWORD || 'admin',
};
logger.info(`basicAuthConfig - env: ${process.env.NODE_ENV}`, basicAuthConfig);
module.exports = basicAuthConfig;
