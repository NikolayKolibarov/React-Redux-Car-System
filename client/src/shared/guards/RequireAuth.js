import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount () {
      if (!this.props.authenticated) {
        // this.context.router.push('/login')
        browserHistory.push('/login')
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated) {
        // this.context.router.push('/login')
        browserHistory.push('/login')
      }
    }

    render () {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps (state) {
    return { authenticated: state.authentication.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
