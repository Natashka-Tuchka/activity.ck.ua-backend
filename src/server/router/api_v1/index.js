const Router = require('koa-joi-router');

const auth = require('./auth');
const places = require('./places');
const organizations = require('./organizations');
const storage = require('./storage');

const {
  server: {
    prefix: { API_V1 },
  },
} = require('../../../config');

const router = new Router();

router.prefix(API_V1);

router.use(auth);
router.use(places);
router.use(organizations);
router.use(storage);

module.exports = router;
