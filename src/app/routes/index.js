const statusRoute = require('./statusRoute');
const userRoute = require('./userRoute');
const sessionRoute = require('./sessionRoute');

const routes = app => {
  app.get('/', (req, res) => {
    res.send('Server is running');
  });

  statusRoute(app);
  userRoute(app);
  sessionRoute(app);
};

module.exports = routes;
