import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import axios from 'axios'

function validate (first_name, last_name, email, password, password_confirm) {
  // True means invalid
  return {
    first_name: first_name.length === 0,
    last_name: last_name.length === 0,
    email: email.length === 0,
    password: password.length < 8,
    password_confirm: password !== password_confirm
  }
}

class SignUpForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      everFocusedFirstName: false,
      everFocusedLastName: false,
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

    const { first_name, last_name, email, password } = this.state
    const user = {
      first_name,
      last_name,
      email,
      password
    }

    axios.post('/users', user)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          browserHistory.push('/profile')
          this.props.updateLoggedIn(true)
        }
      })
        .catch(error => {
          console.log(error)
        })
    this.setState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: ''
    })
  }

  canBeSubmitted () {
    const errors = validate(this.state.first_name, this.state.last_name, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return !isDisabled
  }

  getValidationState () {
    if (this.state.first_name.length === 0) return
    const first_nameLength = this.state.first_name.length
    const isString = typeof this.state.first_name
    if (first_nameLength >= 1) return 'success'
    else if (isString !== String) return 'warning'
    else if (this.state.first_name === undefined) return
  }

  getLastNameValidationState () {
    if (this.state.last_name.length === 0) return
    if (this.state.last_name.length >= 1) return 'success'
    else if (this.state.first_name === undefined) return
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
    const errors = validate(this.state.first_name, this.state.last_name, this.state.email, this.state.password, this.state.password_confirm)
    const isDisabled = Object.keys(errors).some(x => errors[x])
    return (
      <div className='container'>
        <div className='row centered-form'>
          <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={4}>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Sign up for Eat Genius!</h3>
              </div>
              <div className='panel-body'>
                <Form onSubmit={this.handleSubmit} role='form'>
                  <Row>
                    <Col xs={6} md={6}>
                      <FormGroup validationState={this.getValidationState()} className='form-group'>
                        <ControlLabel>First Name:</ControlLabel>
                        <FormControl className={errors.first_name ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='First Name' value={this.state.first_name} onChange={this.handleChange} name='first_name' />
                        <FormControl.Feedback />
                      </FormGroup>
                    </Col>
                    <Col xs={6} sm={6} md={6}>
                      <FormGroup validationState={this.getLastNameValidationState()} className='form-group'>
                        <ControlLabel>Last Name:</ControlLabel>
                        <FormControl className={errors.last_name ? 'error form-control input-sm' : 'form-control input-sm'} type='text' placeholder='Last Name' value={this.state.last_name} onChange={this.handleChange} name='last_name' />
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
      </div>
    )
  }
}

export default SignUpForm
