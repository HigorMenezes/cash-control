const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const categoryController = require('../controllers/categoryController');

const categoryRoute = app => {
  app.get('/categories', jwtAuthMiddleware, categoryController.listAll);
  app.get('/categories/:id', jwtAuthMiddleware, categoryController.listById);

  app.post('/categories', jwtAuthMiddleware, categoryController.create);
  app.patch('/categories/:id', jwtAuthMiddleware, categoryController.edit);
};

module.exports = categoryRoute;
