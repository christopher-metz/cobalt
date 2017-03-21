const React = require('react')
const axios = require('axios')

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      photos: []
    }

    this.loadPhotosFromServer = this.loadPhotosFromServer.bind(this)
  }

  loadPhotosFromServer (id) {
    axios.get(`/server/photo_list/${id}`)
      .then((res) => {
        this.setState({photos: res.data})
        return
      })
  }

  componentDidMount () {
    this.loadPhotosFromServer(1)
  }

  render () {
    return (
      <div>
        <h1>Hello React With Photos!</h1>
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
