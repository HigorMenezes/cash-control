const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const activeUserMiddleware = require('../middleware/activeUserMiddleware');
const cashFlowController = require('../controllers/cashFlowController');

const categoryRoute = app => {
  app.get(
    '/cash-flow',
    jwtAuthMiddleware,
    activeUserMiddleware,
    cashFlowController.listAll,
  );

  app.post(
    '/cash-flow-in',
    jwtAuthMiddleware,
    activeUserMiddleware,
    cashFlowController.createCashIn,
  );
  app.post(
    '/cash-flow-out',
    jwtAuthMiddleware,
    activeUserMiddleware,
    cashFlowController.createCashOut,
  );
  app.post(
    '/cash-flow-report',
    jwtAuthMiddleware,
    activeUserMiddleware,
    cashFlowController.report,
  );
};

module.exports = categoryRoute;
