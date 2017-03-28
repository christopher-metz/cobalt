import React, { Component } from 'react'
import { PageHeader, Image, Row, Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'

class Painting extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (painting, loc) {
    this.props.changePainting(painting, loc)
    browserHistory.push('photo')
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={10} sm={2} smOffset={2} xsOffset={1}>
            <div onClick={() => this.handleClick('la_muse', '/static/img/la_muse.jpg')}>
              La Muse by Pablo Picasso
              <Image src='/static/img/la_muse.jpg' alt='La Muse' responsive rounded />
            </div>
          </Col>
          <Col xs={10} sm={2} xsOffset={1}>
            <div onClick={() => this.handleClick('rain_princess', '/static/img/rain_princess.jpg')}>
              Rain Princess by Leonid Afremov
              <Image src='/static/img/rain_princess.jpg' alt='Rain Princess' responsive rounded />
            </div>
          </Col>
          <Col xs={10} sm={2} xsOffset={1}>
            <div onClick={() => this.handleClick('the_scream', '/static/img/the_scream.jpg')}>
              The Scream by Edvard Munch
              <Image src='/static/img/The_scream.jpg' alt='The Scream' responsive rounded />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={2} smOffset={2} xsOffset={1}>
            <div onClick={() => this.handleClick('shipwreck', '/static/img/the_shipwreck_of_the_minotaur.jpg')}>
            The Shipwreck of the Minotaur - Joseph Turner
            <Image src='/static/img/the_shipwreck_of_the_minotaur.jpg' alt='Shipwreck' responsive rounded />
            </div>
          </Col>
          <Col xs={10} sm={2} xsOffset={1}>
            <div onClick={() => this.handleClick('udnie', '/static/img/udnie.jpg')}>
            Udnie - Francis Picabia
            <Image src='/static/img/udnie.jpg' alt='Udnie' responsive rounded />
            </div>
          </Col>
          <Col xs={10} sm={2} xsOffset={1}>
            <div onClick={() => this.handleClick('wave', '/static/img/wave.jpg')}>
            The Great Wave off Kanagawa - Katsushika Hokusai
            <Image src='/static/img/wave.jpg' alt='The Great Wave' responsive rounded />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Painting
