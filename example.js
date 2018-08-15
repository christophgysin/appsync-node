const gql = require('graphql-tag');
const {
  getIdToken,
  createClient,
} = require('.');

const {
  GRAPHQL_SERVICE_URL,
  COGNITO_USER_ID,
  COGNITO_USER_PASSWORD,
} = process.env;

// declare union types, needed to use fragments
// https://www.apollographql.com/docs/react/advanced/fragments.html
const types = [
  {
    kind: 'UNION',
    name: 'UnionType',
    possibleTypes: [
      {
        name: 'UnionTypeA',
      },
      {
        name: 'UnionTypeB',
      },
    ],
  },
];

const jwtToken = async () =>
  getIdToken(COGNITO_USER_ID, COGNITO_USER_PASSWORD);

const updateUpload = async (client, userId, uploadId, input) => {
  const mutation = gql`
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
    /*
    optimisticResponse: {
      __typename: 'Mutation',
      updateUpload: {
        __typename: 'Result',
        id: '123',
      },
    },
    */
  });
  const data = response.data.updateItem;
  return data;
};

const main = async () => {
  const client = await createClient(GRAPHQL_SERVICE_URL, jwtToken, types);
  await updateUpload(client, {
    key: 'value',
  });
};

Promise.resolve(main());
