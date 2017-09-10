// src/components/LogIn/Registration.js
import React, { Component } from 'react'
import { ControlLabel, PageHeader, Grid, Row, Col, FormControl, FormGroup, Button, HelpBlock, InputGroup } from 'react-bootstrap';
import FieldGroup from '../EventForm/FieldGroup'
import { validateInput, validateEmail, validatePassword, getValidationState, getEmailValidationState, getPasswordValidationState } from './validators'
import { createUser } from '../../actions/registration'
import { connect } from 'react-redux'
import { hash } from './hash'

class Registration extends Component {

  constructor(props) {
     super(props);
     this.state = {userName: '', email: '', passwordHash: '', confirmPassword: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(event) {
     event.preventDefault();
     const { createUser } = this.props;
     //this.state.passwordHash = hash(this.state.passwordHash)
     createUser(this.state);
  }

  render() {
    const { userName, passwordHash, email, confirmPassword } = this.state;
    const { registrationError, errorMessage } = this.props;
    console.log(errorMessage)
    return (
      <Grid>
      <PageHeader>Skráning <small>Skráðu þig hér</small></PageHeader>
      <form>
        <FormGroup controlId="formBasicText" validationState={getValidationState(userName)}>
        <ControlLabel>Notendanafn</ControlLabel>
         <input
           className="form-control"
           type="text"
           placeholder="Skráðu notendanafn hér"
           value={userName}
           onChange={event => this.setState({ userName: event.target.value })}
           required
         />
         <HelpBlock>{validateInput(userName)}</HelpBlock>
         </FormGroup>
         <FormGroup controlId="formBasicEmail" validationState={getEmailValidationState(email)}>
         <ControlLabel>Netfang</ControlLabel>
          <input
            className="form-control"
            type="email"
            placeholder="Skráðu netfang hér"
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
            required
          />
          <HelpBlock>{validateEmail(email)}</HelpBlock>
          </FormGroup>
          <FormGroup controlId="formBasicText" validationState={getValidationState(passwordHash)}>
          <ControlLabel>Lykilorð</ControlLabel>
          <input
            className="form-control"
            type="password"
            placeholder="Skráðu lykilorð hér"
            value={passwordHash}
            onChange={event => this.setState({ passwordHash: event.target.value })}
            required
          />
          <HelpBlock>{validateInput(passwordHash)}</HelpBlock>
          </FormGroup>
          <FormGroup controlId="formBasicText" validationState={getPasswordValidationState(confirmPassword, passwordHash)}>
          <ControlLabel>Lykilorð</ControlLabel>
          <input
            className="form-control"
            type="password"
            placeholder="Lykilorð endurtekið"
            value={confirmPassword}
            onChange={event => this.setState({ confirmPassword: event.target.value })}
            required
          />
          <HelpBlock>{validatePassword(confirmPassword, passwordHash)}</HelpBlock>
          </FormGroup>
         <Button type="submit" onClick={this.handleSubmit}>
           Skrá notanda
         </Button>
       </form>

       {registrationError &&
        <h3>{errorMessage}</h3>
       }
       </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { registrationError, errorMessage } = state.userAuth

  return {
    registrationError: registrationError,
    errorMessage: errorMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (data) => dispatch(createUser(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration)
