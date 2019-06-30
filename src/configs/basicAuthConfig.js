require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const basicAuthConfig = {
  username: process.env.BASIC_AUTH_USERNAME || 'admin',
  password: process.env.BASIC_AUTH_PASSWORD || 'admin',
};

module.exports = basicAuthConfig;
