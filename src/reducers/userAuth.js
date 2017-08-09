import { LOGIN_SUCCESS, LOGIN_ERROR, REGISTRATION_ERROR, LOGOUT } from '../actions/registration'

function auth(state = { }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        hasBeenSent: true,
        errorMessage: '',
      })
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        errorMessage: 'User unauthenticated',
        isAuthenticated: false,
        hasBeenSent: true
      })
    case LOGOUT:
      return Object.assign({}, state, {
        errorMessage: null,
        isAuthenticated: false,
        hasBeenSent: false
      })
    case REGISTRATION_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.errorMessage,
        registrationError: true,
      })
    default:
      return state
  }
}

export default auth
