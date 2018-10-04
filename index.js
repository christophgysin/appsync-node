const {
  createHttpClient,
} = require('./src/graphql');
const {
  getIdToken,
} = require('./src/cognito');

module.exports = {
  createHttpClient,
  getIdToken,
};
