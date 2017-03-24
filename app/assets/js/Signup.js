import axios from 'axios'
import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { Col, Row, FormGroup, FormControl, ControlLabel, Form, Button, validationState } from 'react-bootstrap'

function validate (username, email, password, password_confirm) {
  // True means invalid
  return {
    username: username.length < 0,
    email: email.length === 0,
    password: password.length < 8,
    password_confirm: password !== password_confirm
  }
}

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      everFocusedUsername: false,
      everFocusedEmail: false,
      everFocusedPassword: false,
      everFocusedPasswordConfirm: false,
      inFocus: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.canBeSubmitted = this.canBeSubmitted.bind(this)
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

    const { username, email, password } = this.state
    const user = {
      username,
      email,
      password
    }

    axios.post('/server/users/', user)
      .then(response => {
        if (response.status === 201) {
          browserHistory.push('/profile')
        }
      })
        .catch(error => {
          console.log(error)
        })
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirm: ''
    })
  }

  canBeSubmitted () {
    const errors = validate(this.state.username, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  getValidationState () {
    if (this.state.username.length === 0) return
    const usernameLength = this.state.username.length
    if (usernameLength >= 1) return 'success'
    else if (this.state.username === undefined) return
  }

  getPasswordValidationState () {
    if (this.state.password.length === 0) return ''
    if (this.state.password.length >= 8 && this.state.password.length <= 64) {
      return 'success'
    }
    if (this.state.password.length < 8) return 'error'
    if (this.state.password.length > 64) return 'error'
  }

  getPasswordConfirmValidationState () {
    if (this.state.password.length === 0) return
    if (this.state.password === this.state.password_confirm) return 'success'
    else {
      return 'error'
    }
  }

  getEmailValidationState () {
    if (this.state.email.length === 0) return
    if (this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return 'success'
    else {
      return 'error'
    }
  }

  render () {
    const errors = validate(this.state.username, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return (
      <div className='container'>
        <div className='row centered-form'>
          <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={4}>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Sign up for Cobalt!</h3>
              </div>
              <div className='panel-body'>
                <Form onSubmit={this.handleSubmit} role='form'>
                  <Row>
                    <Col xs={6} md={6}>
                      <FormGroup validationState={this.getValidationState()} className='form-group'>
                        <ControlLabel>Username:</ControlLabel>
                        <FormControl className={errors.username ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='Username' value={this.state.username} onChange={this.handleChange} name='username' />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup validationState={this.getEmailValidationState()} className='form-group'>
                    <ControlLabel>Email:</ControlLabel>
                    <FormControl className={errors.email ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='Enter email' value={this.state.email} onChange={this.handleChange} name='email' />
                    <FormControl.Feedback />
                  </FormGroup>
                  <Row>
                    <Col xs={6} sm={6} md={6}>
                      <FormGroup validationState={this.getPasswordValidationState()} className='form-group'>
                        <ControlLabel>Password:</ControlLabel>
                        <FormControl className={errors.password ? 'error form-control input-sm' : 'form-control input-sm'} type='password' placeholder='Enter password' value={this.state.password} onChange={this.handleChange} name='password' />
                      </FormGroup>
                    </Col>
                    <Col xs={6} md={6}>
                      <ControlLabel>Confirm:</ControlLabel>
                      <FormGroup validationState={this.getPasswordConfirmValidationState()} className='form-group'>
                        <FormControl className={errors.password_confirm ? 'error form-control input-sm' : 'form-control input-sm'} type='password' placeholder='Confirm Password' value={this.state.password_confirm} onChange={this.handleChange} name='password_confirm' />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button disabled={isDisabled} type='submit' value='Register' className='btn btn-info btn-block'>Register</Button>
                </Form>
              </div>
            </div>
          </Col>
        </div>
        <div>
          Already a mamber?
          <Link to='login'> login </Link>
          now.
        </div>
      </div>
    )
  }
}

export default SignUpForm
