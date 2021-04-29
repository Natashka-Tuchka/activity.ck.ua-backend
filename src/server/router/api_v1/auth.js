const Router = require('koa-joi-router');

const {
  apiV1: { auth },
} = require('../../controller');
const {
  apiV1: { auth: validator },
} = require('../../schema');
const {
  checkTokens: { refresh },
} = require('../../middleware');
const {
  server: {
    prefix: { AUTH },
  },
} = require('../../../config');

const router = Router();

router.prefix(AUTH);

router.post('/registration', { validate: validator.registration }, auth.registration);
router.post('/login', { validate: validator.login }, auth.login);

router.get('/google', { validate: validator.google }, auth.google);
router.get('/facebook', { validate: validator.facebook }, auth.facebook);

router.get('/refresh', { validate: validator.refresh }, refresh(), auth.refresh);
router.get('/logout', { validate: validator.logout }, refresh(), auth.logout);

module.exports = router;
