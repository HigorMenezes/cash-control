const winstonUtil = require('../../utils/winstonUtil');

const logger = winstonUtil('info', 'defaultRoute');

const routes = app => {
  app.get('/', (req, res) => {
    logger.info('Server is running');
    res.status(200).send('Server is running');
  });
};

module.exports = routes;
