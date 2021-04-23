function getPagination(query) {
  let { _limit: limit, _page: page } = query;
  limit = parseInt(limit, 10);
  page = parseInt(page, 10);

  return { limit, page };
}

function getPaginationAndUser(query, user) {
  const { id: userId, role: userRole } = user;
  const { limit, page } = getPagination(query);

  return { userId, userRole, limit, page };
}

function getPaginationAndFilters(query) {
  const { limit, page } = getPagination(query);

  const { accessibility, dog_friendly: dogFriendly, child_friendly: childFriendly } = query;

  const filters = {};

  if (accessibility !== undefined) filters.accessibility = accessibility;
  if (dogFriendly !== undefined) filters.dogFriendly = dogFriendly;
  if (childFriendly !== undefined) filters.childFriendly = childFriendly;

  return { limit, page, filters };
}

function getSearchParams(query) {
  const { limit, page } = getPagination(query);
  const { name, type_id: types, category_id: categoryId } = query;

  const filters = {};
  if (categoryId !== undefined) filters.categoryId = categoryId;
  if (types !== undefined) filters.types = types.split('-');

  return { limit, page, name, filters };
}

module.exports = {
  getPaginationAndFilters,
  getPagination,
  getPaginationAndUser,
  getSearchParams,
};
