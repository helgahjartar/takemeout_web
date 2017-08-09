// src/components/LogIn/Registration.js
import React, { Component } from 'react'
import { ControlLabel, PageHeader, Grid, Row, Col, FormControl, FormGroup, Button, HelpBlock, InputGroup } from 'react-bootstrap';
import FieldGroup from '../EventForm/FieldGroup'
import { logInUser, logOutUser, receiveLogin, loginError } from '../../actions/registration'
import { connect } from 'react-redux'
import { hash } from './hash'

class LogIn extends Component {

  constructor(props) {
     super(props);
     this.state = {userName: '', passwordHash: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const { logInUser } = this.props;
     this.state.passwordHash = hash(this.state.passwordHash)
     logInUser(this.state);
   }

  render() {
    const { userName, passwordHash } = this.state;
    const { isAuthenticated, hasBeenSent } = this.props;
    const { logOutUser } = this.props;

    console.log(this.props)

    return (
      <Grid>
      {!hasBeenSent &&
        <form>
        <PageHeader>Innkráning <small>Skráðu þig inn til að skrá atburði</small></PageHeader>
           <FormGroup controlId="formBasicText">
           <ControlLabel>Notendanafn</ControlLabel>
           <input
            className="form-control"
            type="text"
            placeholder="Skráðu netfang hér"
            value={userName}
            onChange={event => this.setState({ userName: event.target.value })}
            required
          />
          </FormGroup>
          <FormGroup controlId="formBasicText">
          <ControlLabel>Lykilorð</ControlLabel>
          <input
            className="form-control"
            type="password"
            placeholder="Skráðu lykilorð hér"
            value={passwordHash}
            onChange={event => this.setState({ passwordHash: event.target.value })}
            required
          />
          </FormGroup>
           <Button type="submit" onClick={this.handleSubmit}>
             Innskrá
           </Button>
         </form>
     }

     {!isAuthenticated && hasBeenSent &&
      <h3>Notendanafn eða lykilorð vitlaust </h3>
     }

     {isAuthenticated && hasBeenSent &&
       <div>
        <h3> Velkomin {this.state.userName}!</h3>
        <h4> Þetta er þitt notendasvæði.</h4>
         <p> Við mælum með því að þú skráir viðburð! </p>
         <Button onClick={logOutUser}> Útskráning </Button>
       </div>
     }

       </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, hasBeenSent } = state.userAuth

  console.log(state)

  return {
    isAuthenticated : isAuthenticated,
    hasBeenSent : hasBeenSent
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logInUser: (data) => dispatch(logInUser(data)),
    logOutUser: () => dispatch(logOutUser())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn)
