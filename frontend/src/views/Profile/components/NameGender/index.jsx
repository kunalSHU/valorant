import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { withStyles } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
 
import "react-datepicker/dist/react-datepicker.css";
// Material components
import { Button, TextField, Typography } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletContent,
  PortletFooter,
  Status,
} from '../../../../components';

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
          <Stepper 
            activeStep={this.props.activeStep} 
            steps={[{title: 'Basic Info'}, {title: 'Location'}]} 
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                error={this.state.values['firstName'] === '' ? true : false}
                helperText={this.state.values['firstName'] === '' ? 'First name cannot be empty' : null}
                label="First name"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('firstName', event.target.value)
                }
                value={values.firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={this.state.values['lastName'] === '' ? true : false}
                helperText={this.state.values['lastName'] === '' ? 'Last name cannot be empty' : null}
                label="Last name"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('lastName', event.target.value)
                }
                value={values.lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                error={this.state.values['phoneNumber'] === '' ? true : false}
                helperText={this.state.values['phoneNumber'] === '' ? 'Phone Number cannot be empty' : null}
                label="Phone Number"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('phoneNumber', event.target.value)
                }
                value={values.phoneNumber}
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
                SelectProps={{ native: true }}
                classNameclassName={classes.textField}
                label="Sex"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('sex', event.target.value)
                }
                select
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
          <Button color="primary" disabled={!this.state.isValid} onClick={() => this.props.nextStep(this.state.values.firstName,
            this.state.values.lastName, this.state.values.phoneNumber, this.state.values.dateofbirth, this.state.values.sex)} variant="contained"
          >
            Next
          </Button>
          { this.state.submitSuccess &&
            <div className={classes.statusContainer}>
              <Status className={classes.status} color="success" size="md"/>
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
