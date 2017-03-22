import React, { Component } from 'react'

class Painting extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (target) {
    this.props.changePainting(target)
  }

  render () {
    return (
      <div>
        <div onClick={() => this.handleClick('la_muse')}>
          La Muse by Pablo Picasso
          <img src='/static/img/la_muse.jpg' alt='La Muse' />
        </div>
        <div onClick={() => this.handleClick('rain_princess')}>
          Rain Princess by Leonid Afremov
          <img src='/static/img/rain_princess.jpg' alt='Rain Princess' />
        </div>
        <div onClick={() => this.handleClick('the_scream')}>
          The Scream by Edvard Munch
          <img src='/static/img/The_scream.jpg' alt='The Scream' />
        </div>
        <div onClick={() => this.handleClick('shipwreck')}>
          The Shipwreck of the Minotaur - Joseph Turner
          <img src='/static/img/the_shipwreck_of_the_minotaur.jpg' alt='Shipwreck' />
        </div>
        <div onClick={() => this.handleClick('udnie')}>
          Udnie - Francis Picabia
          <img src='/static/img/udnie.jpg' alt='Udnie' />
        </div>
        <div onClick={() => this.handleClick('wave')}>
          The Great Wave off Kanagawa - Katsushika Hokusai
          <img src='/static/img/wave.jpg' alt='The Great Wave' />
        </div>
      </div>
    )
  }
}

export default Painting
