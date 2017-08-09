import React, { Component, PropTypes } from 'react'
import style from './style.less'
import RegisteredEvent from '../../components/RegisteredEvent'
import moment from 'moment'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import { fetchEvents } from '../../actions/registration'

class RegisteredEventOverview extends Component {
  componentDidMount() {
    const { fetchEvents } = this.props;
    fetchEvents();
  }

  render() {
    const { events } = this.props

    return (
      <Grid componentClass='main'>
        {Object.keys(events).map((date, i) =>
          <Row key={i} componentClass='section'>
            <h2>{date}</h2>
            {events[date].map((event, j) =>
              <RegisteredEvent key={j} event={event} />
            )}
          </Row>
        )}
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  const { events } = state.registration;

  var dateEventDict = {};
  moment.locale('is');
  events.map(event => {
    var date = moment(event.time).format('l');
    var time = moment(event.time).format('HH:mm');
    if (!dateEventDict[date]) dateEventDict[date] = [];
    dateEventDict[date].push(Object.assign({}, event, {time: time}));
  });

  return {
    events : dateEventDict
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisteredEventOverview)
