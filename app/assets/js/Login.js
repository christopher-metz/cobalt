import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'
import { Row, Col, Form, FormControl, Button, FormGroup } from 'react-bootstrap'

function validate (username, password) {
  // true means invalid
  return {
    username: username.length === 0,
    password: password.length < 8
  }
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.canBeSubmitted = this.canBeSubmitted.bind(this)
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this)
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this)
  }

  handleChange ({ target }) {
    if (target.name) {
      this.setState({
        [target.name]: target.value
      })
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.canBeSubmitted()) {
      event.preventDefault()
      return
    }
    const { username, password } = this.state
    const user = {
      username,
      password
    }
    axios.post('/server/session/', user)
      .then(response => {
        if (response.status === 200) {
          browserHistory.push('/profile')
          // this.props.updateLoggedIn(true)
        }
      })
      .catch(error => {
        console.log(error)
        // alert('Unknown Email Or Password')
      })
  }

  canBeSubmitted () {
    const errors = validate(this.state.username, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  getUsernameValidationState () {
    if (this.state.username.length === 0) return ''
    if (this.state.username.length >= 8 && this.state.username.length <= 64) {
      return 'success'
    }
    if (this.state.username.length < 8) return 'error'
    if (this.state.username.length > 64) return 'error'
  }

  getPasswordValidationState () {
    if (this.state.password.length === 0) return ''
    if (this.state.password.length >= 8 && this.state.password.length <= 64) {
      return 'success'
    }
    if (this.state.password.length < 8) return 'error'
    if (this.state.password.length > 64) return 'error'
  }

  render () {
    const errors = validate(this.state.username, this.state.password)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return (
      <div className='container'>
        <div className='container'>
          <Row>
            <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={4} bsStyle={{display: 'flex', justifyContent: 'center'}}>
              <Form onSubmit={this.handleSubmit} className='form-login'>
                <h4>Welcome back.</h4>
                <FormGroup validationState={this.getUsernameValidationState()}>
                  <FormControl onChange={this.handleChange} value={this.state.username} className={errors.username ? 'error form-control input-sm chat-input' : 'form-control input-sm chat-input'} type='text' id='username' placeholder='Username' name='username' />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup validationState={this.getPasswordValidationState()}>
                  <FormControl onChange={this.handleChange} value={this.state.password} className={errors.password ? 'error form-control input-sm chat-input' : 'form-control input-sm chat-input'} type='password' id='userPassword' placeholder='Password' name='password' />
                  <FormControl.Feedback />
                </FormGroup>
                <div className='buttonWrapper'>
                  <span className='group-btn'>
                    <Button type='submit' disabled={isDisabled} className='btn btn-primary btn-md'>login <i className='fa fa-sign-in' /></Button>
                  </span>
                </div>

              </Form>

            </Col>
          </Row>
        </div>

      </div>
    )
  }
}

export default LoginForm
