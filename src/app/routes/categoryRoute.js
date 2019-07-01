const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const activeUserMiddleware = require('../middleware/activeUserMiddleware');
const categoryController = require('../controllers/categoryController');

const categoryRoute = app => {
  app.get(
    '/categories',
    jwtAuthMiddleware,
    activeUserMiddleware,
    categoryController.listAll,
  );
  app.get(
    '/categories/:id',
    jwtAuthMiddleware,
    activeUserMiddleware,
    categoryController.listById,
  );

  app.post(
    '/categories',
    jwtAuthMiddleware,
    activeUserMiddleware,
    categoryController.create,
  );
  app.patch(
    '/categories/:id',
    jwtAuthMiddleware,
    activeUserMiddleware,
    categoryController.edit,
  );
};

module.exports = categoryRoute;
