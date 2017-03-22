import React, { Component } from 'react'

class ProfileHead extends Component {
  constructor (props) {
    super(props)

    this.state = {
      painting: ''
    }

    this.changePainting = this.changePainting.bind(this)
  }

  changePainting (target) {
    this.setState({
      painting: target
    })
    console.log(target)
  }

  render () {
    return (
      <div>
        {React.cloneElement(this.props.children, { changePainting: this.changePainting })}
      </div>
    )
  }
}

export default ProfileHead
