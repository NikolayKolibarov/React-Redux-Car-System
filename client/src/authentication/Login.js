import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { loginUser } from '../store/authentication'
import { resetError } from '../store/messages'

import Error from '../shared/components/Error'

class Login extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit ({email, password}) {
    this.props.loginUser({email, password})
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <div>
        <h1>Login</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
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
              <button type='submit' className='btn btn-default'>Login</button>
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

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

const mapStateToProps = state => {
  return { error: state.messages.error }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({loginUser, resetError}, dispatch)
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
})(connect(mapStateToProps, mapDispatchToProps)(Login))
