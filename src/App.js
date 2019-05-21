import React from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './graphql/apolloClient'
import Routes from './Routes'

// url: 'http://bulletinlocaltest.local/graphql'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
