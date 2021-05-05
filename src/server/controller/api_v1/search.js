const { searchPlaces, searchEvents } = require('../../../db');
const { getSearchParams } = require('./utils');

async function global(ctx) {
  const { name, limit, page } = getSearchParams(ctx.request.query);

  const response = {};

  response.places = await searchPlaces(name, limit, page);
  response.events = await searchEvents(name, limit, page);

  ctx.body = response;
}

module.exports = { global };