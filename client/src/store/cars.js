import { browserHistory } from 'react-router'

import { SET_ERROR } from './messages'
import carService from '../shared/services/carService'

// Action Types
const FETCH_CARS = 'FETCH_CARS'
const FETCH_CAR = 'FETCH_CAR'
const CREATE_CAR = 'CREATE_CAR'
const SEARCH_CARS = 'SEARCH_CARS'
const LIKE_CAR = 'LIKE_CAR'
const RESET_CAR_SEARCH = 'RESET_CAR_SEARCH'
const CREATE_CAR_REVIEW = 'CREATE_CAR_REVIEW'
const FETCH_CAR_REVIEWS = 'FETCH_CAR_REVIEWS'
const FETCH_USER_CARS = 'FETCH_USER_CARS'
const REMOVE_CAR = 'REMOVE_CAR'

// Action Creators
export function fetchCars (page) {
  return dispatch => {
    carService
      .getCars(page)
      .then(response => {
        dispatch({ type: FETCH_CARS, payload: { cars: response.data } })
      })
  }
}

export function fetchCar (id) {
  return dispatch => {
    carService
      .getCar(id)
      .then(response => {
        dispatch({ type: FETCH_CAR, payload: { car: response.data } })
      })
  }
}

export function createCar ({make, model, year, engine, price, image, mileage}) {
  const data = {make, model, year, engine, price, image, mileage}

  return dispatch => {
    carService
      .createCar(data)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CREATE_CAR})
          browserHistory.push('/cars')
        } else {
          if (response.data.errors) {
            if (response.data.errors.make) {
              dispatch(carsError(response.data.errors.make))
            } else if (response.data.errors.model) {
              dispatch(carsError(response.data.errors.model))
            } else if (response.data.errors.year) {
              dispatch(carsError(response.data.errors.year))
            } else if (response.data.errors.engine) {
              dispatch(carsError(response.data.errors.engine))
            } else if (response.data.errors.price) {
              dispatch(carsError(response.data.errors.price))
            } else if (response.data.errors.image) {
              dispatch(carsError(response.data.errors.image))
            } else if (response.data.errors.mileage) {
              dispatch(carsError(response.data.errors.mileage))
            }
          } else {
            dispatch(carsError(response.data.message))
          }
        }
      })
  }
}

export function searchCars (searchStr, page) {
  return dispatch => {
    carService
      .searchCars(searchStr, page)
      .then(response => {
        dispatch({type: SEARCH_CARS, payload: { cars: response.data }})
      })
  }
}

export function resetSearch () {
  return dispatch => {
    dispatch({type: RESET_CAR_SEARCH})
  }
}

export function createCarReview (carId, review) {
  return dispatch => {
    carService
      .addReview(carId, review)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CREATE_CAR_REVIEW})
          dispatch(fetchCarReviews(carId))
        } else {
          if (response.data.errors) {
            if (response.data.errors.description) {
              dispatch(carsError(response.data.errors.description))
            } else if (response.data.errors.name) {
              dispatch(carsError(response.data.errors.name))
            }
          } else {
            dispatch(carsError(response.data.message))
          }
        }
      })
  }
}

export function fetchCarReviews (carId) {
  return dispatch => {
    carService
      .getReviews(carId)
      .then(response => {
        dispatch({type: FETCH_CAR_REVIEWS, payload: {reviews: response.data}})
      })
  }
}

export function likeCar (carId) {
  return dispatch => {
    carService
      .likeCar(carId)
      .then(response => {
        if (response.data.success) {
          dispatch({type: LIKE_CAR})
        } else {
          dispatch(carsError(response.data.message))
        }
      })
  }
}

export function fetchUserCars () {
  console.log('FUC')
  return dispatch => {
    carService
      .getUserCars()
      .then(response => {
        console.log(response.data)
        dispatch({ type: FETCH_USER_CARS, payload: { cars: response.data } })
      })
  }
}

export function removeCar (id) {
  return dispatch => {
    carService
      .removeCar(id)
      .then(response => {
        console.log(response.data)
        dispatch({type: REMOVE_CAR})
        dispatch(fetchUserCars())
      })
  }
}

export function carsError (error) {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: error
    })
  }
}

const initialState = {
  all: [],
  searchResults: [],
  selected: null,
  selectedCarReviews: [],
  userCars: []
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_CARS:
      return Object.assign({}, state, { all: action.payload.cars })
    case FETCH_CAR:
      return Object.assign({}, state, { selected: action.payload.car })
    case FETCH_CAR_REVIEWS:
      return Object.assign({}, state, { selectedCarReviews: action.payload.reviews })
    case SEARCH_CARS:
      return Object.assign({}, state, { searchResults: action.payload.cars })
    case RESET_CAR_SEARCH:
      return Object.assign({}, state, { searchResults: [] })
    case LIKE_CAR:
      let updatedCar = Object.assign({}, state.selected)
      updatedCar['likes']++
      return Object.assign({}, state, { selected: updatedCar })
    case FETCH_USER_CARS:
      return Object.assign({}, state, { userCars: action.payload.cars })
    case CREATE_CAR:
    case CREATE_CAR_REVIEW:
    case REMOVE_CAR:
    default:
      return state
  }
}
