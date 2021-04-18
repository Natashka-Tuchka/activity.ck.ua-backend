const Router = require('koa-joi-router');

const {
  apiV1: { places },
} = require('../../controller');
const {
  apiV1: { places: validator },
} = require('../../schema');
const {
  checkTokens: { access },
} = require('../../middleware');
const {
  server: {
    prefix: { PLACES },
  },
  ROLES: { EVERY, USER, ORGANIZER },
} = require('../../../config');

const router = Router();

router.prefix(PLACES);

router.post('/', { validate: validator.create }, access([USER, ORGANIZER]), places.create);
router.get('/:id', { validate: validator.getOne }, access([EVERY]), places.getOne);
router.get('/', { validate: validator.getApproved }, places.getApproved);
router.put('/:id', { validate: validator.update }, access([USER, ORGANIZER]), places.update);
router.delete('/:id', { validate: validator.remove }, access([USER, ORGANIZER]), places.remove);

router.post(
  '/:id/reviews/',
  { validate: validator.addReview },
  access([USER, ORGANIZER]),
  places.addReview,
);
router.get('/:id/reviews/', { validate: validator.getReviews }, places.getReviews);
// router.put(
//   '/reviews/:reviewId',
//   { validate: validator.updateReview },
//   access([USER, ORGANIZER]),
//   places.updateReview,
// );
// router.delete(
//   '/reviews/:reviewId',
//   { validate: validator.deleteReview },
//   access([USER, ORGANIZER]),
//   places.deleteReview,
// );

module.exports = router;
