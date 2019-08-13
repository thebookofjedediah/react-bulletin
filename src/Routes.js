import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

// Import Views
import Category from './views/Category'
import Home from './views/Home'
import PostDetail from './views/PostDetail'
import Help from './views/Help'
import Bulletin from './views/Bulletin'
import Special from './views/Special'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Bulletin} />
        <Route exact path='/all' component={Home} />
        <Route exact path='/category/:slug' component={Category} />
        <Route path='/post/:slug' component={PostDetail} />
        <Route exact path='/help' component={Help} />
        <Route exact path='/special' component={Special} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
