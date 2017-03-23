import axios from 'axios'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Confirm extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.edit = this.edit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  edit (component) {
    browserHistory.push(component)
  }

// http --timeout=45 -a chrism:asdfasdf POST http://127.0.0.1:8000/server/photos/ photo=/style_transfer/inputs/Headshot.jpg painting=la_muse

  handleClick () {
    // const photo = JSON.stringify(
    //   {
    //     photo: this.props.photo,
    //     painting: this.props.paintingName
    //   }
    // )
    const photo = JSON.stringify(
      {
        photo_url: 'imThePhotoUrl'
      }
    )
    const csrfToken = document.cookie.split('=')[1]
    console.log(csrfToken)
    let axiosDefaults = require('axios/lib/defaults')
    axiosDefaults.headers.common['X-CSRF-Token'] = csrfToken
    // const axiosSettings = {
    //   headers: {'X-CSRF-Token': cookie}
    // }
    // axios.post('/server/photos/', photo, axiosSettings)
    axios.post('/server/photos/', photo)
      .then(response => {
        console.log(response)
        if (response.status === 201) {
          // browserHistory.push('/profile')
        }
      })
      .catch(error => {
        console.log(error)
      })
    console.log('Ive submitted the photo')
    console.log(this.props.photo)
    console.log(this.props.paintingName)
  }

  render () {
    return (
      <div>
        <div>
          <h5>The Painting</h5>
          <button onClick={() => this.edit('painting')}>Edit</button>
        </div>
        <img src={this.props.paintingLoc} alt='Your Painting' />
        <div>
          <h5>Your Photo</h5>
          <button onClick={() => this.edit('photo')}>Edit</button>
        </div>
        <img src={this.props.photo} alt='Some Photo' />
        <button onClick={this.handleClick}>Create Art</button>
      </div>
    )
  }
}

export default Confirm
