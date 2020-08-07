import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import Palette from '../../../../../theme/palette.js';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel, 
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  IconButton,
  Divider,
} from '@material-ui/core';

import { DateTimePicker } from '@material-ui/pickers';

import {
  DeleteForeverOutlined as DeleteAppointmentIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from '../../../../../components';

// Component styles
import styles from './styles';

class BookAppointment extends Component {

  state = {
    open: true,
    appointmentDate: (new Date()).toISOString(),
    appointmentNotes: ''
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDateChange = (date) => {
    const pickedAppointmentDate = date.toISOString()
    this.setState({ appointmentDate: pickedAppointmentDate });
  }

  handleFieldChange = (event) => {
    this.setState({ appointmentDate: event.target.value });
  }

  onAppointmentAdd = (event) => {
    
  }

  onAppointmentCancel = (event) => {
    this.props.onCancel();
  }

  onAppointmentDelete = (event) => {

  }

  onAppointmentUpdate = (event) => {

  }

  render() {
    const { classes, className, mode } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
          <PortletContent
            className={classes.form}
            noPadding
          >
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

          <TextField
            className={classes.field}
            fullWidth
            label="Additional Notes"
            multiline
            name="title"
            onChange={this.handleFieldChange}
            rows={5}
            rowsMax={5}
            value={this.state.appointmentNotes}
            variant="outlined"
          />

          <Divider />

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
            
            <IconButton
              className={classes.deleteAppointmentButton}
              edge="start" 
              onClick={this.onAppointmentDelete}
            >
              <DeleteAppointmentIcon />
            </IconButton>

          </CardActions>

        </PortletContent>
      </Portlet>
    );
  }
}

BookAppointment.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookAppointment);
