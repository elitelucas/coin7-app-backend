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
router.post('/init', maincontroller.init);
router.post('/temp', maincontroller.temp);

router.post('/admin_setting/get', maincontroller.getAdminSetting);
router.post('/admin_setting/upsert', maincontroller.upsertAdminSetting);
router.post('/admin_setting/delete', maincontroller.deleteAdminSetting);


router.post('/mining/start', maincontroller.mining_start);
router.post('/mining/stop', maincontroller.mining_stop);
router.post('/mining/get', maincontroller.mining_get);

router.post('/mlm/set_referrer', maincontroller.set_referrer);
router.post('/mlm/get_numberofreferees', maincontroller.getNumberofReferees);
router.post('/mlm/get_refereesbylevel', maincontroller.getRefereesbyLevel);
router.post('/mlm/get_rewardbyreferee', maincontroller.getRewardbyReferee);

module.exports = (app) => {
  app.use('/api', router);

  app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/public/test.html');
  });

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
