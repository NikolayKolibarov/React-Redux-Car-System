import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { registerUser } from '../store/authentication'
import { resetError } from '../store/messages'

import Error from '../shared/components/Error'

class Register extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit ({email, name, password, confirmPassword}) {
    this.props.registerUser({ email, name, password, confirmPassword })
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {email, name, password, confirmPassword}, handleSubmit} = this.props

    return (
      <div>
        <h1>Register</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control' placeholder='Name' {...name} />
                {name.touched && name.error && <div className='error'>{name.error}</div>}
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' placeholder='Email' {...email} />
                {email.touched && email.error && <div className='error'>{email.error}</div>}
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input type='password' className='form-control' placeholder='Password' {...password} />
                {password.touched && password.error && <div className='error'>{password.error}</div>}
              </div>
              <div className='form-group'>
                <label>Confirm Password</label>
                <input type='password' className='form-control' placeholder='Confirm Password' {...confirmPassword} />
                {confirmPassword.touched && confirmPassword.error && <div className='error'>{confirmPassword.error}</div>}
              </div>
              <button type='submit' className='btn btn-default'>Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and Confirm Password must match'
  }

  return errors
}

const mapStateToProps = state => {
  return {error: state.messages.error}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser, resetError }, dispatch)
}

export default reduxForm({
  form: 'RegisterForm',
  fields: ['email', 'name', 'password', 'confirmPassword'],
  validate
})(connect(mapStateToProps, mapDispatchToProps)(Register))
