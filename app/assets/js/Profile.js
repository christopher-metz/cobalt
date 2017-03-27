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
  }

  loadPhotosFromServer () {
    axios.get(`/server/photos`)
      .then((res) => {
        this.setState({photos: res.data})
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

  render () {
    return (
      <div>
        <Row>
          <Col xs={5} sm={6} smOffset={2} xsOffset={1}>
            <h3>{this.state.username}</h3>
          </Col>
          <Col xs={5} sm={3}>
            <Button bsSize='small' block onClick={() => { browserHistory.push('painting') }}>Create Art</Button>
          </Col>
        </Row>
        <div>
          {this.state.photos.length !== 0 ? this.state.photos.map((element) => {
            return (
              <Row key={element.id} style={{margin: 2}}>
                <Col xs={10} sm={6} smOffset={3} xsOffset={1}>
                  <Image src={element.photo_url} alt='picture' responsive rounded />
                </Col>
              </Row>
            )
          }) : <div>You havent created any art yet!</div>}
        </div>
      </div>
    )
  }
}

export default Profile
