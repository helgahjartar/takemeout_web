import { handleActions } from 'redux-actions'
import { RECEIVE_EVENTS, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from '../actions/registration'

const initialState = { events: [], success: false, hasBeenSent: false};

export default handleActions({

  RECEIVE_EVENTS (state, action) {
    return Object.assign({}, state, {
      events: action.events
    });
  },

  CREATE_EVENT_SUCCESS (state, action) {
    return Object.assign({}, state, {
      success: true,
      hasBeenSent: true
    });
  },

  CREATE_EVENT_FAILURE (state, action) {
    return Object.assign({}, state, {
      sucess: false,
      hasBeenSent: true
    })
  }

}, initialState);
