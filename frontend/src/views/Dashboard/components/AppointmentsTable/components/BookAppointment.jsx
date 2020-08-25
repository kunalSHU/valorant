import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
// Material helpers
import { withStyles } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

// Material components
import {
  Button,
  CardActions,
  Typography,
  TextField,
  IconButton,
  Divider,
} from '@material-ui/core';


import {
  DeleteForeverOutlined as DeleteAppointmentIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletContent,
} from '../../../../../components';

// Component styles
import styles from './styles';

class BookAppointment extends Component {

  state = {
    appointmentDate: (new Date()).toISOString(),
    appointmentNotes: ''
  };

  handleDateChange = (date) => {
    const pickedAppointmentDate = date.toISOString()
    this.setState({ appointmentDate: pickedAppointmentDate });
  }

  handleFieldChange = (event) => {
    this.setState({ appointmentNotes: event.target.value });
  }

  onAppointmentAdd = () => {
    const { appointmentDate, appointmentNotes } = this.state;
    this.props.onAppointmentAdded({ appointmentDate, appointmentNotes })
  }

  onAppointmentCancel = (event) => {
    this.props.onCancel();
  }

  onAppointmentDelete = (event) => {

  }

  onAppointmentUpdate = (event) => {

  }

  // var newDateObj = moment(oldDateObj).add(30, 'm').toDate();

  render() {
    const { classes, className, mode } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent className={classes.form} noPadding>
            <Typography align="center" gutterBottom variant="h3">
            {mode === "add" ? "Book Appointment" : "View Appointment"}
          </Typography>

          <DateTimePicker
            className={classes.appointmentDatePicker}
            disablePast
            inputVariant="outlined"
            label="Appointment Date"
            minutesStep={30}
            onChange={(date) => this.handleDateChange(date)}
            value={this.state.appointmentDate}
          />

          <CardActions className={classes.actions}>
            {mode === "add" ? (
              <Button
                color="primary"
                onClick={this.onAppointmentAdd}
                variant="outlined"
              >
                Add
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={this.onAppointmentUpdate}
                variant="contained"
              >
                Save
              </Button>
            )}

            <Button onClick={this.onAppointmentCancel} variant="outlined">
              Cancel
            </Button>
            
          </CardActions>

        </PortletContent>
      </Portlet>
    );
  }
}

BookAppointment.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onAppointmentAdded: PropTypes.func.isRequired,
  onAppointmentDeleted: PropTypes.func.isRequired,
  onAppointmentUpdated: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(BookAppointment);
