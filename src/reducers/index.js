import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import registration from './registration'
import userAuth from './userauth'

export default combineReducers({
  routing,
  registration,
  userAuth
})
