const Router = require('koa-joi-router');

const {
  apiV1: { events },
} = require('../../controller');
const {
  apiV1: { events: validator },
} = require('../../schema');
const {
  checkTokens: { access },
} = require('../../middleware');
const {
  server: {
    prefix: { EVENTS },
  },
} = require('../../../config');

const router = Router();

router.prefix(EVENTS);

router.post('/', { validate: validator.create }, access(['user', 'organizer']), events.create);
router.get('/now/', { validate: validator.getNow }, events.getNow);
router.get('/:id', { validate: validator.getOne }, events.getOne);
router.get('/', { validate: validator.getApproved }, events.getApproved);
router.put('/:id', { validate: validator.update }, access(['user', 'organizer']), events.update);
router.delete('/:id', { validate: validator.remove }, access(['user', 'organizer']), events.remove);

// router.post('/:id/attend', { validate: validator.addAttend }, access(['user', 'organizer']), events.addAttend);

module.exports = router;