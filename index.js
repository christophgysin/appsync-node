const {
  createClient,
  createHttpClient,
} = require('./src/graphql');
const {
  getIdToken,
} = require('./src/cognito');

module.exports = {
  createClient,
  createHttpClient,
  getIdToken,
};
