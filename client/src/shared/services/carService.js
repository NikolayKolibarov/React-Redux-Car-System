import { BASE_URL } from '../api'
import requester from '../requester'

const resourceUrl = `${BASE_URL}/cars`

function getCars (page = 1) {
  const serviceUrl = `${resourceUrl}/all?page=${page}`
  return requester.get(serviceUrl)
}

function getCar (id) {
  const serviceUrl = `${resourceUrl}/details/${id}`
  return requester.get(serviceUrl, true)
}

function createCar (car) {
  const serviceUrl = `${resourceUrl}/create`
  return requester.post(serviceUrl, car, true)
}

function searchCars (searchStr, page) {
  const serviceUrl = `${resourceUrl}/all?search=${searchStr}&page=${page}`
  return requester.get(serviceUrl, true)
}

function addReview (id, review) {
  const serviceUrl = `${resourceUrl}/details/${id}/reviews/create`
  return requester.post(serviceUrl, review, true)
}

function getReviews (id) {
  const serviceUrl = `${resourceUrl}/details/${id}/reviews`
  return requester.get(serviceUrl, true)
}

function likeCar (id) {
  const serviceUrl = `${resourceUrl}/details/${id}/like`
  return requester.post(serviceUrl, {}, true)
}

function getUserCars () {
  const serviceUrl = `${resourceUrl}/mine`
  return requester.get(serviceUrl, true)
}

function removeCar (id) {
  const serviceUrl = `${resourceUrl}/delete/${id}`
  return requester.post(serviceUrl, {}, true)
}

export default {
  getCars,
  getCar,
  createCar,
  searchCars,
  addReview,
  getReviews,
  likeCar,
  getUserCars,
  removeCar
}
