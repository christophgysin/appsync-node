const AWS = require('aws-sdk');
const crypto = require('crypto');

const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

const {
  COGNITO_POOL_ID,
  COGNITO_APP_CLIENT_ID,
  COGNITO_APP_CLIENT_SECRET,
} = process.env;

const createSecretHash = userId => crypto
  .createHmac('SHA256', COGNITO_APP_CLIENT_SECRET)
  .update(userId + COGNITO_APP_CLIENT_ID)
  .digest('base64');

const getIdToken = async (userId, password) => {
  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_POOL_ID,
    AuthParameters: {
      SECRET_HASH: createSecretHash(userId),
      USERNAME: userId,
      PASSWORD: password,
    },
  };

  // requires ADMIN_NO_SRP_AUTH to be enabled for App client
  const response = await cognito.adminInitiateAuth(params).promise();
  return response.AuthenticationResult.IdToken;
};

module.exports = {
  getIdToken,
};
