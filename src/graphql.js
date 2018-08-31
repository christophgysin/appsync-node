const AWSAppSyncClient = require('aws-appsync').default;
const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const request = require('request-promise-native');

// Let's pretend we're a web browser :(
require('./browser-hack');

const {
  AWS_REGION,
} = process.env;

const createClient = (url, jwtToken, types = [], region = AWS_REGION) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types,
      },
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

const createHttpClient = async (url, tokenFunc) => {
  // TODO: renew token
  const token = await tokenFunc();

  const client = async (operationName, query, variables = {}) => {
    const options = {
      url,
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: {
        operationName,
        variables,
        query,
      },
      json: true,
    };

    const response = await request(options);

    return response.data;
  };

  return client;
};

module.exports = {
  createClient,
  createHttpClient,
};
