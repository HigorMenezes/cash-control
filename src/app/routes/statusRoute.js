const basicAuthMiddleware = require('../middleware/basicAuthMiddleware');
const statusController = require('../controllers/statusController');

const statusRoute = app => {
  app.get('/status', statusController.listAll);
  app.get('/status/:id', statusController.listById);

  app.post('/status', basicAuthMiddleware, statusController.create);
  app.patch('/status/:id', basicAuthMiddleware, statusController.edit);
};

module.exports = statusRoute;
