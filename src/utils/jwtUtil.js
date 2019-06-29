const jwt = require('jsonwebtoken');
const appConfig = require('../configs/appConfig');

const jwtUtil = {
  sign: id => {
    const result = jwt.sign({ id }, appConfig.secret, { expiresIn: '1d' });
    return result;
  },
};

module.exports = jwtUtil;
