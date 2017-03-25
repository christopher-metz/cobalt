import axios from 'axios'
// import cloudinary from 'cloudinary'
import request from 'superagent'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'

const CLOUDINARY_UPLOAD_PRESET = 'jkkoffrg'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dz1gs7jrp/upload'
// cloudinary.config({
//   cloud_name: 'dz1gs7jrp',
//   api_key: '174496614565755',
//   api_secret: 'BNwqIbysSQlh7DdH7tVmnowvN3E'
// })

class Confirm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uploadedFileCloudinaryUrl: ''
    }

    this.edit = this.edit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  edit (component) {
    browserHistory.push(component)
  }

  handleImageUpload () {
    // const photo = this.props.photo
    // cloudinary.uploader.upload(photo,
    //   {width: 900, height: 900, crop: 'fill'},
    //   (err, response) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', this.props.photo)

    upload.end((err, response) => {
      if (err) {
        console.log('its an error: ', err)
      }

      if (response.body.secure_url !== '') {
        console.log('its uploaded')
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        })
        this.handleClick()
      }
    })
  }

  handleClick () {
    const body = {
      painting: this.props.paintingName,
      photo: this.state.uploadedFileCloudinaryUrl,
      public_id: this.props.photo.name
    }

    const csrfToken = document.cookie.split('=')[1]
    const axiosSettings = {
      headers: {
        'X-CSRFToken': csrfToken
      }
    }
    axios.post('/server/photos/', body, axiosSettings)
        .then(response => {
          if (response.status === 201) {
            browserHistory.push('/profile')
          }
        })
        .catch(error => {
          console.log(error)
        })
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
        <img src={this.props.photo.preview} alt='Some Photo' />
        <button onClick={this.handleImageUpload}>Create Art</button>
      </div>
    )
  }
}

export default Confirm
