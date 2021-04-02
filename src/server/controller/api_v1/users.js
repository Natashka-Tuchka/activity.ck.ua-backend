const {
  getPlace,
  getEvent,
  getUsersVisitedPlaces,
  getUsersFavoritesPlaces,
  getUsersPlaces,
  getUsersEvents,
  getUsersScheduledEvents,
} = require('../../../db');

const {
  users: {
    default: { ITEMS_IN_SECTION, PAGE, LIMIT },
    section: { EVENT_ID, PLACE_ID },
  },
} = require('../../../config');

function getUserIdAndPageInfo(ctx) {
  const { id: userId } = ctx.state.authPayload;

  let { _limit: limit, _page: page } = ctx.request.query;

  limit = parseInt(limit || LIMIT, 10);
  page = parseInt(page || PAGE, 10);

  return { userId, limit, page };
}

async function mainPage(ctx) {
  const { id: userId } = ctx.state.authPayload;

  const getSectionInfo = async (sectionFunction, sectionIdKey) => {
    const sectionResults = await sectionFunction(userId, ITEMS_IN_SECTION, PAGE);

    const fullSectionResults = [];

    for await (const { [sectionIdKey]: sectionId } of sectionResults) {
      // 1
      // const section = await getGeneralInfo(sectionId);

      // 2
      let section;
      if (sectionIdKey === PLACE_ID) section = await getPlace(sectionId);
      else section = await getEvent(sectionId);

      fullSectionResults.push({
        id: sectionId,
        name: section.name,
        main_photo: section.main_photo,
      });
    }

    return fullSectionResults;
  };

  const response = {};

  response.visited_places = await getSectionInfo(getUsersVisitedPlaces, PLACE_ID);
  response.favorites_places = await getSectionInfo(getUsersFavoritesPlaces, PLACE_ID);
  response.user_places = await getSectionInfo(getUsersPlaces, PLACE_ID);
  response.user_events = await getSectionInfo(getUsersEvents, EVENT_ID);
  response.scheduled_events = await getSectionInfo(getUsersScheduledEvents, EVENT_ID);

  ctx.body = response;
}

async function getVisitedPlaces(ctx) {
  const { userId, limit, page } = getUserIdAndPageInfo(ctx);

  const visitedPlaces = await getUsersVisitedPlaces(userId, limit, page);

  ctx.body = { visited_places: visitedPlaces };
}

async function getFavoritesPlaces(ctx) {
  const { userId, limit, page } = getUserIdAndPageInfo(ctx);

  const favoritesPlaces = await getUsersFavoritesPlaces(userId, limit, page);

  ctx.body = { favorites_places: favoritesPlaces };
}

async function getPlaces(ctx) {
  const { userId, limit, page } = getUserIdAndPageInfo(ctx);

  const places = await getUsersPlaces(userId, limit, page);

  ctx.body = { places };
}

async function getEvents(ctx) {
  const { userId, limit, page } = getUserIdAndPageInfo(ctx);

  const events = await getUsersEvents(userId, limit, page);

  ctx.body = { events };
}

async function getScheduledEvents(ctx) {
  const { userId, limit, page } = getUserIdAndPageInfo(ctx);

  const scheduledEvents = await getUsersScheduledEvents(userId, limit, page);

  ctx.body = { scheduled_events: scheduledEvents };
}

module.exports = {
  mainPage,
  getVisitedPlaces,
  getFavoritesPlaces,
  getPlaces,
  getEvents,
  getScheduledEvents,
};