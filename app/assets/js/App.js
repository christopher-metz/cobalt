import Profile from './Profile'
import SignUpForm from './Signup'
import LoginForm from './Login'
import Landing from './Landing'
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// import './App.css'

class App extends Component {
  render () {
    console.log('im here')
    return (
      <Router history={browserHistory}>
        <div>This is in the App.js file</div>
        <Route path='/' component={Landing} />
        <Route path='/signup' component={SignUpForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/profile' component={Profile} />
      </Router>
    )
  }
}

export default App
