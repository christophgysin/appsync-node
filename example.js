const {
  getIdToken,
  createHttpClient,
} = require('.');

const {
  GRAPHQL_SERVICE_URL,
  COGNITO_USER_ID,
  COGNITO_USER_PASSWORD,
} = process.env;

const jwtToken = async () =>
  getIdToken(COGNITO_USER_ID, COGNITO_USER_PASSWORD);

const updateUpload = async (client, userId, uploadId, input) => {
  const mutation = `
    mutation Mutation(
      $input: InputType!
    ){
      updateItem(
        input: $input
      ) {
        id
      }
    }
  `;

  const variables = {
    input,
  };

  const response = await client.mutate({
    mutation,
    variables,
  });
  const data = response.data.updateItem;
  return data;
};

const main = async () => {
  const client = await createHttpClient(GRAPHQL_SERVICE_URL, jwtToken);
  await updateUpload(client, {
    key: 'value',
  });
};

Promise.resolve(main());
