// src/components/LogIn/Registration.js
import React, { Component } from 'react'
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

class FieldGroup extends Component {

  render() {
    return (
      <FormGroup controlId={this.props.id}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {...this.props.props} />
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default FieldGroup
