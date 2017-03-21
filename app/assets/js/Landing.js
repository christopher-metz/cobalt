import React, { Component } from 'react'
import { Link } from 'react-router'
// import './landing.css'
// import JumbotronComponent from '../Jumbotron'
// import { Row, Col, Button } from 'react-bootstrap'

class Landing extends Component {
  render () {
    return (
      <div>
        We are a cool style transfer app.
        <Link to='signup'>Sign Up</Link>
      </div>
    )
  }
}

export default Landing
