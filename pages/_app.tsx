import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

import {
  ApolloProvider
} from "@apollo/client"
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NavigationContextProvider from '../context/navigationContext'
import PlausibleProvider from 'next-plausible'
import { ToastContainer } from 'react-toastify'

// import graphqlClient from '../graphql/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <ApolloProvider client={graphqlClient}> */}
        <PlausibleProvider trackLocalhost={false} domain="youmedrinks.com">
          <NavigationContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </NavigationContextProvider>
        </PlausibleProvider>
      {/* </ApolloProvider> */}
    </>
  )
}

export default MyApp
