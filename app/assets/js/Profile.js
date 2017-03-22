const React = require('react')
import { browserHistory } from 'react-router'
const axios = require('axios')

class Landing extends React.Component {
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
    axios.delete('/server/session')
      .then(response => {
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
        <h1>Hello React With Photos!</h1>
        <button onClick={this.logout}>Logout</button>
        <ul>
          {this.state.photos.map((element) => {
            return (
              <li key={element.id}><img src={element.photo_url} alt='picture' /></li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Landing
