import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import thunk from 'redux-thunk'
import './App.css'

// Import Views
import Category from './views/Category'
// import CreatePost from './views/CreatePost'
import Home from './views/Home'
import PostDetail from './views/PostDetail'

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, thunk))
)

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://bulletinlocaltest.local/' }),
  cache: new InMemoryCache()
})

// url: 'http://bulletinlocaltest.local/graphql'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/:category' component={Category} />
              <Route path='/:category/:post_id' component={PostDetail} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}

export default App
