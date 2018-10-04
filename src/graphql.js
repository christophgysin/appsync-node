const request = require('request-promise-native');

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
        query,
        variables,
      },
      json: true,
    };

    const response = await request(options);

    return response;
  };

  return client;
};

module.exports = {
  createHttpClient,
};
