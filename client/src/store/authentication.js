import { browserHistory } from 'react-router'

import { SET_ERROR } from './messages'
import userService from '../shared/services/userService'

// Actions
const REGISTER_USER = 'REGISTER_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// Action Creators
export function registerUser ({name, email, password}) {
  return dispatch => {
    userService
      .register({name, email, password})
      .then(response => {
        if (response.data.success) {
          dispatch({type: REGISTER_USER})
          browserHistory.push('/login')
        } else {
          if (response.data.errors) {
            if (response.data.errors.password) {
              dispatch(authenticationError(response.data.errors.password))
            }
          } else {
            dispatch(authenticationError(response.data.message))
          }
        }
      })
  }
}

export function loginUser ({email, password}) {
  return dispatch => {
    userService
      .login({email, password})
      .then(response => {
        if (response.data.success) {
          dispatch({type: LOGIN_USER, payload: { user: response.data.user }})
          sessionStorage.setItem('token', response.data.token)
          browserHistory.push('/')
        } else {
          dispatch(authenticationError(response.data.message))
        }
      })
  }
}

export function logoutUser () {
  return dispatch => {
    dispatch({type: LOGOUT_USER})
    sessionStorage.removeItem('token')
    browserHistory.push('/login')
  }
}

export function authenticationError (error) {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
}

// Reducer
export default function reducer (state = { authenticated: false, currentUser: {} }, action = {}) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { authenticated: true, currentUser: action.payload.user })
    case LOGOUT_USER:
      return Object.assign({}, state, { authenticated: false, currentUser: {} })
    case REGISTER_USER:
    default:
      return state
  }
}
