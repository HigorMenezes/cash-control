const sessionController = require('../controllers/sessionController');

const session = app => {
  app.post('/session', sessionController.store);
};

module.exports = session;
