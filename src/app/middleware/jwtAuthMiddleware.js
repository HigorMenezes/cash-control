const jwtUtil = require('../../utils/jwtUtil');
const logger = require('../../utils/winstonUtil')('info', 'jwtAuthMiddleware');

const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const [, token] = authHeader.split(' ');

      try {
        const decoded = await jwtUtil.verify(token);
        req.userId = decoded.id;
      } catch (err) {
        logger.error('Invalid token', err);
        return res.send({
          code: 401,
          message: 'Invalid token',
        });
      }
    } else {
      return res.send({
        code: 401,
        message: 'Token not provided',
      });
    }
  } catch (err) {
    logger.error('jwtAuthMiddleware - Error during token validation', err);
    return res.send({
      code: 500,
      message: 'Error during token validation',
    });
  }

  return next();
};

module.exports = jwtAuthMiddleware;
