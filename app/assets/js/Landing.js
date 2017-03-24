import axios from 'axios'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

class Landing extends Component {

  componentWillMount () {
    axios.get('/server/session')
      .then(response => {
        if (response.status === 200) {
          browserHistory.push('profile')
        }
      })
  }

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
