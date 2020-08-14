import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
// Material helpers
import { withStyles } from '@material-ui/core';
import { DateTimePicker, DatePicker } from '@material-ui/pickers';
 
import "react-datepicker/dist/react-datepicker.css";
// Material components
import { Button, TextField, Typography } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  Status,
  CircularProgress,
} from '../../../../components';
import DatePickerField from '../../../../views/Dashboard/components/AppointmentsTable/components/DatePickerField/DatePickerField'
// Component styles
import styles from './styles';
import Stepper from 'react-stepper-horizontal';


const sexes = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

class NameGender extends Component {
  state = {
    isValid: false,
    values: {
      firstName: 'John',
      lastName: 'Doe',
      sex: sexes[0].label,
      phoneNumber: '000-000-0000',
      dateofbirth: (new Date()).toISOString(),
      email: 'example@email.com'
    },
    empty: {},
    submitSuccess: false
  };

  submitForm = () => {
    const newState = { ...this.state };
    newState.submitSuccess = true;
    this.setState(newState);
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    
    newState.values[field] = value;

    newState.isValid = true;
    if (newState.values['firstName'] === '' || newState.values['lastName'] === ''
      || newState.values['phoneNumber'] === '') {
      newState.isValid = false;
    }

    this.setState(newState);
    console.log(this.state.values.firstName)
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader style={{height: "85px"}}>
          <Stepper steps={[{title: 'Basic Info'}, {title: 'Location'}] } activeStep={this.props.activeStep} />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="First name"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('firstName', event.target.value)
                }
                value={values.firstName}
                error={this.state.values['firstName'] === '' ? true : false}
                helperText={this.state.values['firstName'] === '' ? 'First name cannot be empty' : null}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('lastName', event.target.value)
                }
                value={values.lastName}
                error={this.state.values['lastName'] === '' ? true : false}
                helperText={this.state.values['lastName'] === '' ? 'Last name cannot be empty' : null}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
              className={classes.textField}
                label="Phone Number"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('phoneNumber', event.target.value)
                }
                value={values.phoneNumber}
                error={this.state.values['phoneNumber'] === '' ? true : false}
                helperText={this.state.values['phoneNumber'] === '' ? 'Phone Number cannot be empty' : null}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
              className={classes.textField}
                label="Email"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('email', event.target.value)
                }
                value={values.email}
                error={this.state.values['email'] === '' ? true : false}
                helperText={this.state.values['email'] === '' ? 'Email cannot be empty' : null}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <DatePicker
              className={classes.appointmentDatePicker}
              disableFuture
              inputVariant="outlined"
              label="Date of Birth"
              onChange={(date) => this.handleFieldChange('dateofbirth', date)}
              value={this.state.values.dateofbirth}
              />
            </div>
            <div className={classes.field}>
              <TextField
                classNameclassName={classes.textField}
                label="Sex"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('sex', event.target.value)
                }
                select
                SelectProps={{ native: true }}
                value={values.sex}
                variant="outlined"
              >
                {sexes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="primary" variant="contained" disabled={!this.state.isValid} onClick={() => this.props.nextStep(this.state.values.firstName,
            this.state.values.lastName, this.state.values.phoneNumber, this.state.values.dateofbirth, this.state.values.sex, this.state.values.email)}>
            Next
          </Button>
          { this.state.submitSuccess &&
            <div className={classes.statusContainer}>
              <Status className={classes.status} size='md' color='success'/>
              <Typography variant="caption">
                Information has been updated
              </Typography>
            </div>
          }
        </PortletFooter>
      </Portlet>
    );
  }
}

NameGender.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[NameGender, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('NameGender', NameGender, styles);
export default withStyles(newStyles)(NameGender);
