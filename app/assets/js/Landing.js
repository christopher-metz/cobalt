import React, { Component } from 'react'
import { Link } from 'react-router'
// import './landing.css'
// import JumbotronComponent from '../Jumbotron'
// import { Row, Col, Button } from 'react-bootstrap'

class Landing extends Component {
  render () {
    return (
      <div>
        <h3>We are a cool style transfer app!</h3>
        <h2>
          Styalize any photo in the style of 6 different famous paintings.
        </h2>
        <img src='http://res.cloudinary.com/dz1gs7jrp/image/upload/v1490032643/chicago_ofvxcw.jpg' alt='photo' />
        <Link to='login'>Start Creating Art</Link>
      </div>
    )
  }
}

export default Landing
