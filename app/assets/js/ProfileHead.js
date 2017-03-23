import React, { Component } from 'react'

class ProfileHead extends Component {
  constructor (props) {
    super(props)

    this.state = {
      paintingName: '',
      paintingLoc: '',
      photo: ''
    }

    this.changePainting = this.changePainting.bind(this)
    this.changePhoto = this.changePhoto.bind(this)
  }

  changePainting (painting, loc) {
    this.setState({
      paintingName: painting,
      paintingLoc: loc
    })
  }

  changePhoto (photo) {
    console.log(this.state.painting)
    this.setState({
      photo: photo
    })
  }

  render () {
    return (
      <div>
        {React.cloneElement(this.props.children, { paintingName: this.state.paintingName, paintingLoc: this.state.paintingLoc, photo: this.state.photo, changePainting: this.changePainting, changePhoto: this.changePhoto })}
      </div>
    )
  }
}

export default ProfileHead
