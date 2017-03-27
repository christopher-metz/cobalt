import axios from 'axios'
import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
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

  componentWillMount () {
    axios.get('/server/session')
      .then(response => {
        if (response.status === 200) {
          this.loginTrue()
        }
      })
      .catch(() => {
        this.loginFalse()
      })
  }

  render () {
    return (
      <div style={{backgrounColor: 'blue'}}>
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
        <div>
          {React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, loginFalse: this.loginFalse, loginTrue: this.loginTrue})}
        </div>
        <Navbar inverse>
          <div>@cobaltart2017</div>
        </Navbar>
      </div>
    )
  }
}

export default Nav
