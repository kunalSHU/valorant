import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
// Material helpers
import { withStyles } from '@material-ui/core';

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
} from '../../../../components';

// Component styles
import styles from './styles';

const appointmentStatuses = [
  {
    value: 'completed',
    label: 'Completed'
  },
  {
    value: 'cancelled',
    label: 'Cancelled'
  },
  {
    value: 'inProgress',
    label: 'In-progress'
  }
];

class AppointmentInfo extends Component {
  state = {
    isValid: false,
    values: {
      appointmentDate: (new Date()),
      appointmentStatus: appointmentStatuses[0].label
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
    if (newState.values['appointmentDate'] === '') {
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
        <PortletHeader>
          <PortletLabel
            subtitle="Basic information about the appointment"
            title="Appointment Info"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                disabled
                label="Appointment Date"
                margin="dense"
                value={values.appointmentDate}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                SelectProps={{ native: true }}
                className={classes.textField}
                label="Status"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('status', event.target.value)
                }
                required
                select
                value={values.appoinmentStatus}
                variant="outlined"
              >
                {appointmentStatuses.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="primary" disabled={!this.state.isValid} onClick={this.submitForm} variant="contained">
            Update
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

AppointmentInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[AppointmentInfo, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('AppointmentInfo', AppointmentInfo, styles);
export default withStyles(newStyles)(AppointmentInfo);
