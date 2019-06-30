const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
const cashFlowController = require('../controllers/cashFlowController');

const categoryRoute = app => {
  app.get('/cash-flow', jwtAuthMiddleware, cashFlowController.listAll);

  app.post('/cash-flow-in', jwtAuthMiddleware, cashFlowController.createCashIn);
  app.post(
    '/cash-flow-out',
    jwtAuthMiddleware,
    cashFlowController.createCashOut,
  );
  app.post('/cash-flow-report', jwtAuthMiddleware, cashFlowController.report);
};

module.exports = categoryRoute;
