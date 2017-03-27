import axios from 'axios'
import React, { Component } from 'react'
import { PageHeader, Image, Carousel, Row, Col, Button } from 'react-bootstrap'
import { browserHistory, Link } from 'react-router'

class Landing extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    axios.get('/server/session')
      .then(response => {
        if (response.status === 200) {
          this.props.loginTrue()
          browserHistory.push('profile')
        }
      })
  }

  // componentWillMount () {
  //   if (this.props.loggedIn) {
  //     browserHistory.push('profile')
  //   }
  // }

  render () {
    return (
      <div>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <PageHeader>Styalize any photo!</PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <h3>
              Using machine learning you can make any photo look as if it were a famous painting.
            </h3>
          </Col>
        </Row>
        <div className='well' style={{maxWidth: 400, margin: '0 auto 10px'}}>
          <Button bsSize='large' block onClick={() => { browserHistory.push('signup') }}>Start Creating Art</Button>
        </div>
        <Row>
          <Col xs={10} sm={6} smOffset={3} xsOffset={1}>
            <Carousel>
              <Carousel.Item>
                <img id='carouselImg' width={712} height={700} alt='900x500' src='http://res.cloudinary.com/dz1gs7jrp/image/upload/v1490032643/chicago_ofvxcw.jpg' />
                <Carousel.Caption>
                  <h3>Chicago Skyline</h3>
                  <p>This photo was styled as the painting 'The Great Wave off Kanagawa' by Katsushika Hokusai</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img id='carouselImg' width={712} height={700} alt='900x500' src='http://res.cloudinary.com/dz1gs7jrp/image/upload/c_fill,h_476,w_712/v1490553643/acca6znjfaukpu9kjorv.jpg' />
                <Carousel.Caption>
                  <h3>Seattle Skyline</h3>
                  <p>This photo was styled as the painting 'The Scream' by Edvard Munch</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img id='carouselImg' width={712} height={700} alt='900x500' src='http://res.cloudinary.com/dz1gs7jrp/image/upload/c_fill,h_476,w_712/v1490339235/pzouq6bwjivpugiglrrs.jpg' />
                <Carousel.Caption>
                  <h3>Nordica Skis Lineup</h3>
                  <p>This photo was styled as the painting 'Udnie' by Francis Picabia</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Landing
