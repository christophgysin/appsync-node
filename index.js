const AWSAppSyncClient = require('aws-appsync').default;
const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');

// Let's pretend we're a web browser :(
require('./browser-hack');

const {
  AWS_REGION,
} = process.env;

const createClient = (url, jwtToken, types = [], region = AWS_REGION) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    __schema: {
      types,
    },
  });

  const appSyncClient = new AWSAppSyncClient({
    url,
    region,
    auth: {
      type: 'AMAZON_COGNITO_USER_POOLS',
      jwtToken,
    },
    cacheOptions: {
      fragmentMatcher,
    },
  });

  return appSyncClient.hydrated();
};

module.exports = {
  createClient,
};
