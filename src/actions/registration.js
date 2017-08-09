import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router'
import fetch from 'isomorphic-fetch'

export const CREATE_USER = 'CREATE_USER';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

let user_token = null;

function receiveEvents(events) {
  return {
    type: RECEIVE_EVENTS,
    events: events,
    userId: '3'
  }
}

export function fetchEvents() {
  return dispatch => {
    return fetch("http://localhost:8080/event/registration", {
      method: "GET"
    }).then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      // Todo: Add error handling
  }
}

function createEventSuccess() {
  return {
    type: CREATE_EVENT_SUCCESS,
    success: true,
    hasBeenSent: true
  }
}

function createEventFailure() {
  return {
    type: CREATE_EVENT_FAILURE,
    success: false,
    hasBeenSent: true
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  }
}

function registrationError(msg) {
  return {
    type: REGISTRATION_ERROR,
    errorMessage: msg
  }
}

function loginError(user) {
  return {
    type: LOGIN_ERROR,
    errorMessage: 'User not authenticated',
    isAuthenticated: false,
    hasBeenSent: true
  }
}

export function createEvent(data) {
  console.log(user_token)

  return dispatch => {
    return fetch("http://localhost:8080/event/registration", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json; charset=UTF-8",
        "token" : user_token
      },
      body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200)
          dispatch(createEventSuccess())
        else
          dispatch(createEventFailure())
    })
  }
}

export function createUser(userData) {
  return dispatch => {
    return fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: { "Content-Type" : "application/json; charset=UTF-8"},
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) browserHistory.push('/login')
      else dispatch(registrationError("User already exists"))
    })
  }
}

export function logOutUser() {
  user_token = null;

  dispatch({ type: LOGOUT })
}

export function logInUser(userData) {

  return dispatch => {
    return fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json; charset=UTF-8"},
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) {
        res.text().then(token => {
          user_token = token;
          dispatch(receiveLogin(userData))
        });
      } else {
        dispatch(loginError(userData))
      }
    })
  }
}
