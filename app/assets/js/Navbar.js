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
    this.updateLogin = this.updateLogin.bind(this)
  }

  updateLogin () {
    if (this.state.loggedIn) {
      this.setState({loggedIn: false})
    } else {
      this.setState({loggedIn: true})
    }
  }

  logout () {
    axios.get('/server/logout')
      .then(response => {
        if (response.status === 200) {
          this.updateLogin()
          browserHistory.push('landing')
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
            {/* <NavItem eventKey={1} > */}
            {this.state.loggedIn ? 'Logout' : 'Login'}
            {/* </NavItem> */}
          </Navbar.Link>
        </Navbar>
        {React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn})}
        <Navbar inverse>
          <div>@cobaltart2017</div>
        </Navbar>
      </div>
    )
  }
}

export default Nav
