import '../styles/globals.css'

import {
  ApolloProvider
} from "@apollo/client"
import type { AppProps } from 'next/app'
import Head from 'next/head'
import PlausibleProvider from 'next-plausible'
import graphqlClient from '../graphql/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ApolloProvider client={graphqlClient}>
        <PlausibleProvider trackLocalhost={false} domain="youmedrinks.com">
          <Component {...pageProps} />
        </PlausibleProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
