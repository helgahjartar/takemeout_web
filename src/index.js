import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import RegisteredEventOverview from './containers/RegisteredEventOverview'
import EventContainer from './containers/EventRegistrationContainer'
import EventForm from './components/EventForm/EventForm'
import LogIn from './components/UserAuth/LogIn'
import Registration from './components/UserAuth/Registration'

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={EventContainer}>
      <Route path='/' caption='Viðburðir' component={RegisteredEventOverview} />,
        <Route path='/login' caption='Innskráning' component={LogIn} />,
        <Route path='/registration' caption='Skrá Viðburð' component={EventForm} />
        <Route path='/user_registration' caption='Skráning notenda' component={Registration} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
