const {
  validateUser,
  signup,
  authenticate,
  listUsers,
  search,
  find
} = require('./controllers/users');
const maincontroller = require("./controllers/maincontroller.js");

const router = require('express').Router();

//authentication
router.post('/signup', validateUser, signup);
router.post('/authenticate', validateUser, authenticate);

//users
router.get('/users', listUsers);
router.get('/users/:search', search);
router.get('/user/:username', find);


router.post('/ping', maincontroller.ping);
router.post('/temp', maincontroller.temp);


module.exports = (app) => {
  app.use('/api', router);

  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      message: error.message
    });
  });
};
