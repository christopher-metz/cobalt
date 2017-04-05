import React, { Component } from 'react'
import { PageHeader, Image, Row, Col, Button, ButtonToolbar, Grid } from 'react-bootstrap'
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
        <Grid>
          <Row>
            <Col xs={10} sm={4} md={3} mdOffset={0} smOffset={0} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('la_muse', '/static/img/la_muse.jpg')}>
              La Muse by Pablo Picasso
              <Button block>
                <Image src='/static/img/la_muse.jpg' alt='La Muse' responsive rounded />
              </Button>
              </div>
            </Col>
            <Col xs={10} sm={4} md={3} mdOffset={1} smOffset={2} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('rain_princess', '/static/img/rain_princess.jpg')}>
              Rain Princess by Leonid Afremov
              <Button block>
                <Image src='/static/img/rain_princess.jpg' alt='Rain Princess' responsive rounded />
              </Button>
              </div>
            </Col>
            <Col xs={10} sm={4} md={3} mdOffset={1} smOffset={0} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('the_scream', '/static/img/the_scream.jpg')}>
              The Scream by Edvard Munch
              <Button block>
                <Image src='/static/img/The_scream.jpg' alt='The Scream' responsive rounded />
              </Button>
              </div>
            </Col>
            {/* </Row>
        <Row> */}
            <Col xs={10} sm={4} md={3} mdOffset={0} smOffset={2} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('udnie', '/static/img/udnie.jpg')}>
              Udnie - Francis Picabia
              <Button block>
                <Image src='/static/img/udnie.jpg' alt='Udnie' responsive rounded />
              </Button>
              </div>
            </Col>
            <Col xs={10} sm={4} md={3} mdOffset={1} smOffset={0} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('shipwreck', '/static/img/the_shipwreck_of_the_minotaur.jpg')}>
              The Shipwreck of the Minotaur - Joseph Turner
              <Button block>
                <Image src='/static/img/the_shipwreck_of_the_minotaur.jpg' alt='Shipwreck' responsive rounded />
              </Button>
              </div>
            </Col>
            <Col xs={10} sm={4} md={3} mdOffset={1} smOffset={2} xsOffset={1}>
              <div style={{marginTop: '5'}} onClick={() => this.handleClick('wave', '/static/img/wave.jpg')}>
              The Great Wave off Kanagawa - Katsushika Hokusai
              <Button block>
                <Image src='/static/img/wave.jpg' alt='The Great Wave' responsive rounded />
              </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Painting
