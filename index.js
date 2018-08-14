const { createClient } = require('./src/graphql');
const { getIdToken } = require('./src/cognito');

module.exports = {
  createClient,
  getIdToken,
};
