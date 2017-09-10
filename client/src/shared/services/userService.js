import { BASE_URL } from '../api'
import requester from '../requester'

const resourceUrl = `${BASE_URL}/auth`

function register ({name, email, password}) {
  const serviceUrl = `${resourceUrl}/signup`
  return requester.post(serviceUrl, {name, email, password}, false)
}

function login ({email, password}) {
  const serviceUrl = `${resourceUrl}/login`
  return requester.post(serviceUrl, {email, password}, false)
}

export default {
  login,
  register
}
