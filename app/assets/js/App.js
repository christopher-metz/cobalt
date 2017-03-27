import Confirm from './Confirm'
import Landing from './Landing'
import LoginForm from './Login'
import Nav from './Navbar'
import Painting from './Painting'
import Photo from './Photo'
import Profile from './Profile'
import ProfileHead from './ProfileHead'
import SignUpForm from './Signup'
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Nav}>
          <IndexRoute component={Landing} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/profile' component={ProfileHead}>
            <IndexRoute component={Profile} />
            <Route path='/painting' component={Painting} />
            <Route path='/photo' component={Photo} />
            <Route path='/confirm' component={Confirm} />
          </Route>
        </Route>
      </Router>
    )
  }
}

export default App
