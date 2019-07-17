import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import Views
import Category, { allPosts } from './views/Category'
import Home from './views/Home'
import PostDetail from './views/PostDetail'
import Help from './views/Help'
import Bulletin from './views/Bulletin'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/all' component={Home} />
        <Route exact path='/' component={Bulletin} />
        <Route exact path='/category/' component={allPosts} />
        <Route exact path='/category/:slug' component={Category} />
        <Route path='/post/:slug' component={PostDetail} />
        <Route exact path='/help' component={Help} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
