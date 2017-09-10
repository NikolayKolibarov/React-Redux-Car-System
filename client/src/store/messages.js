// Action Types
export const SET_SUCCESS = 'SET_SUCCESS'
const RESET_SUCCESS = 'RESET_SUCCESS'

export const SET_ERROR = 'SET_ERROR'
const RESET_ERROR = 'RESET_ERROR'

// Action Creators
export function setSuccess (success) {
  return dispatch => {
    dispatch({
      type: SET_SUCCESS,
      payload: success
    })
  }
}

export function resetSuccess () {
  return dispatch => {
    dispatch({
      type: RESET_SUCCESS
    })
  }
}

export function setError (error) {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
}

export function resetError () {
  return dispatch => {
    dispatch({
      type: RESET_ERROR
    })
  }
}

// Reducer
export default function reducer (state = { error: '' }, action = {}) {
  switch (action.type) {
    case SET_ERROR:
      console.log(action.payload)
      return Object.assign({}, state, { error: action.payload })
    case RESET_ERROR:
      return Object.assign({}, state, { error: '' })

    default:
      return state
  }
}
