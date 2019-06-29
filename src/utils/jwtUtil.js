const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const appConfig = require('../configs/appConfig');

const jwtUtil = {
  sign: id => {
    const result = jwt.sign({ id }, appConfig.secret, { expiresIn: '1d' });
    return result;
  },
  verify: async token => {
    const result = await promisify(jwt.verify)(token, appConfig.secret);
    return result;
  },
};

module.exports = jwtUtil;
