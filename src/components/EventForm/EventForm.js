// src/components/Form.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, PageHeader, Grid, Checkbox, Radio, FormGroup, Button, HelpBlock, InputGroup } from 'react-bootstrap';
import DatePicker  from 'react-bootstrap-date-picker';
import { createEvent, createEventSuccess } from '../../actions/registration'
import { validateInput, validateDateInput, getDateValidationState, getDescValidationState, getValidationState, validateDescription, returnFormErrors } from './validators'
import TimePicker from 'react-bootstrap-time-picker';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EventForm extends Component {

  constructor(props) {
     super(props);
     this.state = {newForm: true, name: '', description: '', location: '', time: new Date().toISOString(), type: 'Tónleikar', clock: '43200', access: ''};
     this.handleSubmit = this.handleSubmit.bind(this);
   }

  handleSubmit(event) {
    event.preventDefault();
    const errors = returnFormErrors(this.state);
    if (errors.value != null) {
      event.preventDefault();
      console.log(errors);
      alert("Form er vitlaust fyllt út");
      return;
    }
    const { createEvent } = this.props;
    createEvent(this.state);
    this.state.newForm = false;
  }

  render() {
    const { name, location, description, time, type, clock, access, newForm} = this.state;
    const { success, hasBeenSent, isAuthenticated } = this.props;
    console.log(this.props);
    return (
      <Grid>
      {isAuthenticated &&
        <form>
        <PageHeader>Skráning viðburðar <small>Skráðu viðburð hér</small></PageHeader>

        <FormGroup controlId="formBasicText" validationState={getValidationState(name)}>
        <ControlLabel>Titill viðburðar</ControlLabel>
          <input
           className="form-control"
           type="text"
           placeholder="Skráðu titil hér"
           value={name}
           onChange={event => this.setState({ name: event.target.value })}
           required
          />
          <HelpBlock>{validateInput(name)}</HelpBlock>
          </FormGroup>
          <FormGroup controlId="formBasicText" validationState={getValidationState(location)}>
          <ControlLabel>Staðsetning</ControlLabel>
          <input
          className="form-control"
           type="text"
           placeholder="Skráðu staðsetningu hér"
           value={location}
           onChange={event => this.setState({ location: event.target.value })}
           required
          />
          <HelpBlock>{validateInput(location)}</HelpBlock>
          </FormGroup>
          <ControlLabel>Veldu gæði aðgengis á viðburðarstað</ControlLabel>
          <FormGroup value={access} onChange={event => this.setState({ access: event.target.value })}>
           <Radio inline id="1" name="radio" value="Mjög gott aðgengi">
             Mjög gott
           </Radio>
           {' '}
           <Radio inline id="2" name="radio" value="Gott aðgengi">
             Gott
           </Radio>
           {' '}
           <Radio inline id="3" name="radio" value="Sæmilegt aðgengi">
             Sæmilegt
           </Radio>
           {' '}
           <Radio inline id="4" name="radio" value="Lélegt aðgengi">
             Lélegt
           </Radio>
           {' '}
           <Radio inline id="5" name="radio" value="Mjög lélegt aðgengi">
             Mjög lélegt
           </Radio>
         </FormGroup>
          <FormGroup validationState={getDateValidationState(time)}>
            <ControlLabel>Veldu dagsetningu</ControlLabel>
            <DatePicker value={time} onChange={time => this.setState({ time: time })}/>
            <HelpBlock>{validateDateInput(time)}</HelpBlock>
          </FormGroup>
          <FormGroup>
          <ControlLabel>Veldu tíma</ControlLabel>
            <TimePicker value={clock} start="12:00" end="23:59" step={30} onChange={clock => this.setState({ clock: clock })}/>
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Veldu tegund atburðar</ControlLabel>
            <FormControl componentClass="select" placeholder="select" value={type} onChange={event => this.setState({ type: event.target.value })}>
              <option value="Tónleikar">Tónleikar</option>
              <option value="Ljóðakvöld">Ljóðakvöld</option>
              <option value="Uppistand">Uppistand</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea" validationState={getDescValidationState(description)}>
          <ControlLabel>Lýsing sem þú vilt að birtist með</ControlLabel>
          <textarea className="form-control"
            placeholder="Texti"
            value={description}
            onChange={event => this.setState({ description: event.target.value })}
            required
            />
            <HelpBlock>{validateDescription(description)}</HelpBlock>
          </FormGroup>
          <Button type="submit" onClick={this.handleSubmit}>
            Senda
          </Button>
        </form>
        }

        {!isAuthenticated &&
          <h3>Þú þarft að skrá þig inn til að skrá viðburð </h3>
        }

        {isAuthenticated && success && hasBeenSent && !newForm &&
          <h3>Skráning viðburðar tókst! </h3>
        }

        {isAuthenticated && !success && hasBeenSent && !newForm &&
          <h3>Form ekki rétt fyllt út </h3>
        }

      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: (data) => dispatch(createEvent(data))
  }
}

function mapStateToProps(state) {
  const { success, hasBeenSent } = state.registration
  const { isAuthenticated } = state.userAuth

  console.log(state)

  return {
    isAuthenticated : isAuthenticated,
    success : success,
    hasBeenSent : hasBeenSent
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)
