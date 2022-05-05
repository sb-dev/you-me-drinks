import { GraphQLClient } from 'graphql-request';
const endpoint = 'https://graphql.eu.fauna.com/graphql';

const GraphqlClient = (endpoint, key) => {
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${key}`,
    },
  })
};

export default GraphqlClient;
