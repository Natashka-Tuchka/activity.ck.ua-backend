require('dotenv').config();

const fatal = require('../utils/fatalError')(__filename);

const config = {
  content: {
    EVENTS_PERIOD: '2 week', // This is an INTERVAL type value!
  },

  server: {
    PORT: Number(process.env.PORT) || 3012,
    HOST: process.env.HOST || 'localhost',
    prefix: {
      API_V1: '/api/v1',
      AUTH: '/auth',
      PLACES: '/places',
      ORGANIZATIONS: '/organizations',
      USERS: { path: '/users', MYSELF: { path: '/myself' } },
      EVENTS: '/events',
    },
    NODE_ENV: process.env.NODE_ENV || 'production',
    MORGAN_FORMAT: 'dev',
    JSON_ERROR_NAME: 'error',
    HASH_SECRET: process.env.HASH_SECRET || fatal('No HASH_SECRET'),
    tokens: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || fatal('No ACCESS_TOKEN_SECRET'),
      ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE || fatal('No ACCESS_TOKEN_LIFE'),
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || fatal('No REFRESH_TOKEN_SECRET'),
      REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE || fatal('No REFRESH_TOKEN_LIFE'),
    },
  },
  errors: {
    DATABASE: 'DatabaseError',
  },
  ROLES: {
    EVERY: 'every',
    USER: 'user',
    ORGANIZER: 'organizer',
    MODERATOR: 'moderator',
  },
  secretKey: process.env.ACCESS_TOKEN_SECRET || fatal('ACCESS_TOKEN_SECRET is not defined'),
  db: {
    defaultType: process.env.DB_WRAPPER_TYPE || 'pg',
    config: {
      knex: {
        client: 'postgresql',
        connection: {
          user: process.env.POSTGRES_USER || fatal('POSTGRES_USER is not defined'),
          host: process.env.POSTGRES_HOST || fatal('DB_HOST is not defined'),
          port: Number(process.env.POSTGRES_PORT) || fatal('DB_PORT is not defined'),
          database: process.env.POSTGRES_DB || fatal('POSTGRES_DB is not defined'),
          password: process.env.POSTGRES_PASSWORD || fatal('POSTGRES_PASSWORD is not defined'),
        },
        pool: {
          min: 2,
          max: 10,
        },
        debug: true,
      },

      pg: {
        user: process.env.POSTGRES_USER || fatal('POSTGRES_USER is not defined'),
        host: process.env.POSTGRES_HOST || fatal('DB_HOST is not defined'),
        port: Number(process.env.POSTGRES_PORT) || fatal('DB_PORT is not defined'),
        database: process.env.POSTGRES_DB || fatal('POSTGRES_DB is not defined'),
        password: process.env.POSTGRES_PASSWORD || fatal('POSTGRES_PASSWORD is not defined'),
      },
    },
  },
  moderator: {
    name: process.env.MODERATOR_NAME || fatal('No MODERATOR_NAME'),
    avatar: process.env.MODERATOR_AVATAR || fatal('No MODERATOR_AVATAR'),
    email: process.env.MODERATOR_EMAIL || fatal('No MODERATOR_EMAIL'),
    password: process.env.MODERATOR_PASSWORD || fatal('No MODERATOR_PASSWORD'),
  },
  auth: {
    CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID || fatal('No GOOGLE_AUTH_CLIENT_ID'),
    CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET || fatal('No GOOGLE_AUTH_CLIENT_SECRET'),
    REDIRECT_URL: process.env.GOOGLE_AUTH_REDIRECT_URL || fatal('No GOOGLE_AUTH_REDIRECT_URL'),
  },
};

module.exports = config;
