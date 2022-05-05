/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
    graphqlKey: process.env.GRAPHQL_KEY
  },
  serverRuntimeConfig: {
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
    graphqlKey: process.env.GRAPHQL_KEY
  }
}

module.exports = nextConfig
