require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const winstonUtil = require('../utils/winstonUtil');

const logger = winstonUtil('info', 'config');

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USERNAME || 'dbname',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'admin',
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './src/database/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
logger.info(`dbConfig - env: ${process.env.NODE_ENV}`, dbConfig);
module.exports = dbConfig;
