import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
const axios = require('axios')

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      photos: []
    }

    this.loadPhotosFromServer = this.loadPhotosFromServer.bind(this)
    this.logout = this.logout.bind(this)
  }

  loadPhotosFromServer (id) {
    axios.get(`/server/photos`)
      .then((res) => {
        this.setState({photos: res.data})
        return
      })
  }

  componentDidMount () {
    this.loadPhotosFromServer(1)
  }

  logout () {
    axios.get('/server/logout')
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          browserHistory.push('/')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <div><h3>Your Photos!</h3><Link to='painting'>Create Art</Link></div>
        <button onClick={this.logout}>Logout</button>
        <ul>
          {this.state.photos.length === 0 ? this.state.photos.map((element) => {
            return (
              <li key={element.id}><img src={element.photo_url} alt='picture' /></li>
            )
          }) : <li>You havent created any art yet!</li>}
        </ul>
      </div>
    )
  }
}

export default Profile
