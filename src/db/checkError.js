const {
  errors: { DATABASE },
} = require('../config');

class DatabaseError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }

    this.name = DATABASE;
  }
}

function checkError(err) {
  if (err.constraint === 'users_email_unk') {
    return new DatabaseError('ERROR: A user with the same email is already registered!');
  }

  if (err.constraint === 'organizations_email_unk') {
    return new DatabaseError('ERROR: An organization with the same email is already registered!');
  }

  if (err.constraint === 'organizations_name_unk') {
    return new DatabaseError('ERROR: An organization with the same name is already registered!');
  }

  if (err.constraint === 'places_fk0') {
    return new DatabaseError('ERROR: An organization with this ID does not exist!');
  }

  if (err.constraint === 'events_fk0') {
    return new DatabaseError('ERROR: A place with this ID does not exist!');
  }

  return err;
}

module.exports = { checkError, DatabaseError };
