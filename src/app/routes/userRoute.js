const basicAuthMiddleware = require('../middleware/basicAuthMiddleware');
const userController = require('../controllers/userController');

const userRoute = app => {
  app.get('/users', userController.listAll);
  app.get('/users/:id', userController.listById);

  app.post('/users', basicAuthMiddleware, userController.create);
  app.patch('/users/:id', basicAuthMiddleware, userController.edit);
};

module.exports = userRoute;
