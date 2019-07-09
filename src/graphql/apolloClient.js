import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  // link: new HttpLink({ uri: 'http://bulletinlocaltest.local/graphql' }),
  link: new HttpLink({ uri: 'https://www.wpgraphql.com/graphql' }),
  // link: new HttpLink({ uri: 'http://wp-student.franciscan.online/graphql' }),
  cache: new InMemoryCache()
})

export default client
