import React, { Component } from 'react'

class ProfileHead extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <div>
        {React.cloneElement(this.props.children)}
      </div>
    )
  }
}

export default ProfileHead
