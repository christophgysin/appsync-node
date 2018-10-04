const request = require('request-promise-native');

const createHttpClient = async (url, tokenFunc) => {
  let token = await tokenFunc();

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

    let response;

    try {
      response = await request(options);
    } catch (error) {
      if (error.statusCode !== 401) {
        throw error;
      }

      // got 401, refreshing token
      token = await tokenFunc();

      // retrying request
      options.headers.Authorization = token;
      response = await request(options);
    }

    return response;
  };

  return client;
};

module.exports = {
  createHttpClient,
};
