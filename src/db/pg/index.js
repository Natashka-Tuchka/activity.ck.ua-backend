const { Pool } = require('pg');
const users = require('./users');
const organizations = require('./organizations');
const places = require('./places');

const log = require('../../utils/logger')(__filename);

module.exports = (config) => {
  const client = new Pool(config);
  const { createUser, getUser, getUserCredentials, updateUser, deleteUser } = users(client);
  const {
    createOrganization,
    getOrganizations,
    updateOrganization,
    deleteOrganization,
  } = organizations(client);
  const { createPlace, getPlace, getPlaces, updatePlace, deletePlace } = places(client);

  return {
    testConnection: async () => {
      try {
        log.info(`hello from pg testConnection`);
        await client.query('SELECT NOW();');
      } catch (err) {
        log.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      log.info(`Closing pg DB wrapper`);
      client.end();
    },

    createUser,
    getUser,
    getUserCredentials,
    updateUser,
    deleteUser,

    createOrganization,
    getOrganizations,
    updateOrganization,
    deleteOrganization,

    createPlace,
    getPlace,
    getPlaces,
    updatePlace,
    deletePlace,
  };
};