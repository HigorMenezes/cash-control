const { User } = require('../models');
const logger = require('../../utils/winstonUtil')(
  'info',
  'activeUserMiddleware',
);

const activeUserMiddleware = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId, statusId: 100 },
    });
    if (!user) {
      return res.send({
        code: 403,
        message: 'User not allowed',
      });
    }
  } catch (err) {
    logger.error(
      'activeUserMiddleware - Error while check if user is active',
      err,
    );
    return res.send({
      code: 500,
      message: 'Error while check if user is active',
    });
  }
  return next();
};

module.exports = activeUserMiddleware;
