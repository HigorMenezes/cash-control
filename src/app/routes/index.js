const statusRoute = require('./statusRoute');
const userRoute = require('./userRoute');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  statusRoute(app);
  userRoute(app);
};

module.exports = routes;
