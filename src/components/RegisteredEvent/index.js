import React, { Component } from 'react'
import { Col } from 'react-bootstrap'
import style from './style.less'

class RegisteredEvent extends Component {

  formatTime(time) {
    let hour = Math.floor(time/3600);
    let minutes = '00';
    if ((time%3600)!=0) {
      minutes = '30';
    }
    return (hour + ':' + minutes);
  }

  render() {
    const { event } = this.props


    return (
      <Col sm={4} md={3}>
        <div className='event-info'>
            <h2>{event.name}</h2>
            <h4>20:00{"  -  " + event.locationName}</h4>
            <p>{event.description}</p>
            <p><i className="fa fa-wheelchair" aria-hidden="true"></i>
             &nbsp; {event.access}</p>
        </div>
      </Col>
    )
  }
}

export default RegisteredEvent
