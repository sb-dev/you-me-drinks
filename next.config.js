/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    host: "https://youmedrinks.com",
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT
  },
  serverRuntimeConfig: {
    graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
    graphqlKey: process.env.GRAPHQL_KEY
  }
}

module.exports = nextConfig
