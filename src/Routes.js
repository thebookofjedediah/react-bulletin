import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

// Import Views
import Category from './views/Category'
import Home from './views/Home'
import PostDetail from './views/PostDetail'
import Bulletin from './views/Bulletin'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Bulletin} />
        <Route exact path='/all' component={Home} />
        <Route exact path='/category/:slug' component={Category} />
        <Route path='/post/:slug' component={PostDetail} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
