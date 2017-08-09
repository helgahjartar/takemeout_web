import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid , Col, PageHeader, Row} from 'react-bootstrap';
import style from './style.less'
import NavBar from '../../components/NavBar';
import EventOverview from '../RegisteredEventOverview';
import EventForm from '../../components/EventForm/EventForm';
import Registration from '../../components/UserAuth/Registration'
import LogIn from '../../components/UserAuth/LogIn';

class EventRegistrationContainer extends Component {

  render() {
    const { childRoutes } = this.props.route;
    const links = mapRoutesToLinks(childRoutes);

    return(
      <Grid className='grid'>
      <PageHeader>
        <h1 className='header'>TAKE ME OUT</h1>
        <h3 className='sub-header'>hvert vilt þú fara í kvöld?</h3>
        </PageHeader>
        <Col xs={12} md={8} className='main-body' componentClass="container">
          <NavBar links={links} className='col-sm-3' />
        </Col>
        <Col xs={6} md={4} componentClass="main" className='main-col'>
            {this.props.children}
        </Col>
      </Grid>
    );
  }
}

function mapRoutesToLinks(routes) {
  return routes.map(route => {
    return { caption: route.caption, path: route.path }
  });
}

export default EventRegistrationContainer
