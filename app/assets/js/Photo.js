import Dropzone from 'react-dropzone'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Photo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      preview: ''
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (file) {
    console.log(file[0])
    this.props.changePhoto(file[0])
    this.setState({
      preview: file[0].preview
    })
    browserHistory.push('confirm')
  }

  render () {
    return (
      <div>
        <Dropzone multiple={false} onDrop={this.onDrop}>
          <div>Drop a photo here</div>
        </Dropzone>
        <img src={this.state.preview} alt='Your Photo' />
      </div>
    )
  }
}

export default Photo
