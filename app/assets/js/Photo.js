import Dropzone from 'react-dropzone'
import React, { Component } from 'react'
import { Button, Image, Overlay, Row, Col } from 'react-bootstrap'
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
    this.props.changePhoto(file[0])
    this.setState({
      preview: file[0].preview
    })
    browserHistory.push('confirm')
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={10} xsOffset={1} sm={5} smOffset={1}>
            <Row>
              <Col xs={6}>
                <h5>The Painting</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Image src={this.props.paintingLoc} alt='Your Painting' responsive rounded />
              </Col>
            </Row>
          </Col>
          <Col xs={10} xsOffset={1} sm={5}>
            <Row>
              <Col xs={6}>
                <h5>Pick A Photo</h5>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {this.state.preview.length === 0
                    ? <Dropzone multiple={false} onDrop={this.onDrop}>
                      <div>Drop a photo here</div>
                    </Dropzone>
                    : <Image src={this.state.preview} alt='Your Photo' responsive rounded />}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Photo
