import axios from 'axios'
import request from 'superagent'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Image, Overlay, Row, Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'

const CLOUDINARY_UPLOAD_PRESET = 'jkkoffrg'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dz1gs7jrp/upload'

const CustomPopover = React.createClass({
  render () {
    return (
      <Row>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
          <div
            style={{
              backgroundColor: '#EEE',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              border: '1px solid #CCC',
              borderRadius: 3,
              marginLeft: -5,
              marginTop: 5,
              padding: 10
            }}
          >
            Loading...
            <img src={'/static/img/ajax-loader.gif'} />
          </div>
        </Col>
      </Row>
    )
  }
})

class Confirm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uploadedFileCloudinaryUrl: '',
      show: false
    }

    this.edit = this.edit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  edit (component) {
    browserHistory.push(component)
  }

  handleImageUpload () {
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
    this.setState({ show: !this.state.show })
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
            this.setState({ show: !this.state.show })
            browserHistory.push('/profile')
          }
        })
        .catch(error => {
          this.setState({ show: !this.state.show })
          console.log(error)
        })
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={10} xsOffset={1} sm={5} smOffset={1}>
            <Row>
              <Col xs={6}>
                <h5>The Painting</h5>
              </Col>
              <Col xs={6}>
                <Button onClick={() => this.edit('painting')}>Edit</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Image src={this.props.paintingLoc} alt='Your Painting' responsive rounded />
              </Col>
            </Row>
          </Col>
          <Col xs={10} xsOffset={1} sm={5}>
            <Row>
              <Col xs={6}>
                <h5>Your Photo</h5>
              </Col>
              <Col xs={6}>
                <Button onClick={() => this.edit('photo')}>Edit</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Image src={this.props.photo.preview} alt='Some Photo' responsive rounded />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={4} xsOffset={4} >
            <Overlay
              show={this.state.show}
              onHide={() => this.setState({ show: false })}
              placement='top'
              container={this}
              target={() => ReactDOM.findDOMNode(this.refs.target)}
            >
              <CustomPopover />
            </Overlay>
            <Button onClick={this.handleImageUpload}>Create Art</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Confirm
