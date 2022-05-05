import {
  ApolloClient,
  InMemoryCache,
  createHttpLink
} from "@apollo/client"

import getConfig from "next/config"
import { setContext } from '@apollo/client/link/context'

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({
  uri: publicRuntimeConfig.graphqlEndpoint
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token ? token : publicRuntimeConfig.graphqlKey}`
    }
  }
})

const graphqlClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default graphqlClient
