const { User } = require('../models');
const logger = require('../../utils/winstonUtil')('info', 'sessionController');

const sessionController = {
  store: async (req, res) => {
    try {
      if (req.body && req.body.email && req.body.password) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user !== undefined && user !== null) {
          if (await user.checkPassword(password)) {
            return res.send({
              code: 200,
              message: 'Session validate with success',
              content: { token: user.generateToken() },
            });
          }
          return res.send({ code: 401, message: 'Invalid password' });
        }
        return res.send({ code: 404, message: 'User not found' });
      }
      return res.send({ code: 400, message: 'Bad request' });
    } catch (err) {
      logger.error('Store - Error during get session', err);
      return res.send({
        code: 500,
        message: 'Error during get session',
      });
    }
  },
};

module.exports = sessionController;
