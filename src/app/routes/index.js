const statusRoute = require('./statusRoute');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  statusRoute(app);
};

module.exports = routes;
