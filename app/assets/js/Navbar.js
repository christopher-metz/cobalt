import React, { Component } from 'react'
import { Link } from 'react-router'

class Navbar extends Component {
  render () {
    return (
      <div>
        <h1><Link to='/'>Cobalt</Link></h1>
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
}

export default Navbar
