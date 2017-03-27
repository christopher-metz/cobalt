import axios from 'axios'
import React, { Component } from 'react'
import { Navbar, NavItem } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

class Nav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false
    }

    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.loginFalse = this.loginFalse.bind(this)
    this.loginTrue = this.loginTrue.bind(this)
  }

  loginFalse () {
    this.setState({loggedIn: false})
  }

  loginTrue () {
    this.setState({loggedIn: true})
  }

  logout () {
    console.log('im here')
    axios.get('/server/logout')
      .then(response => {
        if (response.status === 200) {
          this.loginFalse()
          browserHistory.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleClick () {
    if (this.state.loggedIn) {
      this.logout()
    } else {
      browserHistory.push('login')
    }
  }

  render () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Cobalt</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Link pullRight onClick={this.handleClick}>
            {this.state.loggedIn ? 'Logout' : 'Login'}
          </Navbar.Link>
        </Navbar>
        {React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, loginFalse: this.loginFalse, loginTrue: this.loginTrue})}
        <Navbar inverse>
          <div>@cobaltart2017</div>
        </Navbar>
      </div>
    )
  }
}

export default Nav
