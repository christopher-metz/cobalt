import React, { Component } from 'react'
import { browserHistory } from 'react-router'

class Painting extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (painting, loc) {
    this.props.changePainting(painting, loc)
    browserHistory.push('photo')
  }

  render () {
    return (
      <div>
        <div onClick={() => this.handleClick('la_muse', '/static/img/la_muse.jpg')}>
          La Muse by Pablo Picasso
          <img src='/static/img/la_muse.jpg' alt='La Muse' />
        </div>
        <div onClick={() => this.handleClick('rain_princess', '/static/img/rain_princess.jpg')}>
          Rain Princess by Leonid Afremov
          <img src='/static/img/rain_princess.jpg' alt='Rain Princess' />
        </div>
        <div onClick={() => this.handleClick('the_scream', '/static/img/The_scream.jpg')}>
          The Scream by Edvard Munch
          <img src='/static/img/The_scream.jpg' alt='The Scream' />
        </div>
        <div onClick={() => this.handleClick('shipwreck', '/static/img/the_shipwreck_of_the_minotaur.jpg')}>
          The Shipwreck of the Minotaur - Joseph Turner
          <img src='/static/img/the_shipwreck_of_the_minotaur.jpg' alt='Shipwreck' />
        </div>
        <div onClick={() => this.handleClick('udnie', '/static/img/udnie.jpg')}>
          Udnie - Francis Picabia
          <img src='/static/img/udnie.jpg' alt='Udnie' />
        </div>
        <div onClick={() => this.handleClick('wave', '/static/img/wave.jpg')}>
          The Great Wave off Kanagawa - Katsushika Hokusai
          <img src='/static/img/wave.jpg' alt='The Great Wave' />
        </div>
      </div>
    )
  }
}

export default Painting
