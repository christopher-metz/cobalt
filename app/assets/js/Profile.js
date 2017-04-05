import axios from 'axios'
import React, { Component } from 'react'
import { Image, Row, Col, Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photos: [],
      username: ''
    }

    this.loadPhotosFromServer = this.loadPhotosFromServer.bind(this)
    this.loadUserFromServer = this.loadUserFromServer.bind(this)
    this.deletePhoto = this.deletePhoto.bind(this)
  }

  loadPhotosFromServer () {
    axios.get(`/server/photos`)
      .then((res) => {
        const photos = res.data
        photos.sort((a, b) => {
          return b.id - a.id
        })
        this.setState({photos: photos})
        return
      })
  }

  loadUserFromServer () {
    axios.get(`/server/users`)
      .then((res) => {
        this.setState({username: res.data[0].username})
        return
      })
  }

  componentDidMount () {
    this.loadPhotosFromServer()
    this.loadUserFromServer()
  }

  deletePhoto (element) {
    const newPhotos = this.state.photos
    const photo = newPhotos.splice(newPhotos.indexOf(element), 1)
    const id = element.id
    const csrfToken = document.cookie.split('=')[1]
    const axiosSettings = {
      headers: {
        'X-CSRFToken': csrfToken
      }
    }
    axios.delete(`/server/photo/${id}`, axiosSettings)
      .then(() => {
        this.setState({
          photos: newPhotos
        })
      })
      .catch((err) => {
        console.log('failure', err)
      })
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={12} sm={4} smOffset={4}>
            <h2>{this.state.username}'s Photos!</h2>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col xs={9} sm={5} smOffset={3} xsOffset={1}>
              <Button bsStyle='primary' bsSize='small' block onClick={() => { browserHistory.push('painting') }}>Create Art</Button>
            </Col>
          </Row>
          {this.state.photos.length !== 0 ? <div>
            {this.state.photos.map((element) => {
              return (
                <Row key={element.id} style={{margin: 2}}>
                  <Col xs={9} sm={5} smOffset={3} xsOffset={1}>
                    <Image src={element.photo_url} alt='picture' responsive rounded />
                  </Col>
                  <Col xs={1}>
                    <Button bsStyle='warning' bsSize='small' onClick={() => this.deletePhoto(element)}>Delete</Button>
                  </Col>
                </Row>
              )
            })} </div> :
            <Col xs={4} xsOffset={4}>You havent created any art yet!</Col>
          }
        </Row>
      </div>
    )
  }
}

export default Profile
