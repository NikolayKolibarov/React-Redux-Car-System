import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

const initialState = {}
const middleware = [reduxThunk]
const enhancers = []
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware), ...enhancers))

export default store
