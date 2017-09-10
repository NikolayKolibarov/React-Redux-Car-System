import React, { Component } from 'react'
import { IndexRoute, Router, Route } from 'react-router'

import App from './App'

// Guards
import RequireGuest from './shared/guards/RequireGuest'
import RequireAuth from './shared/guards/RequireAuth'

import Home from './Home'

// Authentication
import Register from './authentication/Register'
import Login from './authentication/Login'

// Account
import Profile from './account/Profile'

// Cars
import CreateCar from './cars/containers/CreateCar'
import Cars from './cars/containers/Cars'
import CarDetails from './cars/containers/CarDetails'

import NotFound from './NotFound'

export default class Routes extends Component {
  render () {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          {/* Authentication */}
          <Route path='/register' component={RequireGuest(Register)} />
          <Route path='/login' component={RequireGuest(Login)} />
          {/* Account */}
          <Route path='/profile' component={RequireAuth(Profile)} />
          {/* Cars */}
          <Route path='/cars' component={Cars} />
          <Route path='/cars/create' component={RequireAuth(CreateCar)} />
          <Route path='/cars/details/:id' component={RequireAuth(CarDetails)} />

          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}
