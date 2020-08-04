import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

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

import { DateTimePicker } from '@material-ui/pickers'

// import DatePickerField from './DatePickerField/DatePickerField.jsx';

import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import {
  ArrowForward as ArrowForward
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
    open: true
  };

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    const { mode } = this.props

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
            inputVariant="outlined"
            label="Appointment Date"
            // onChange={handleDateChange}
            value={new Date()}
          />

          <TextField
            className={classes.field}
            fullWidth
            label="Notes"
            multiline
            name="title"
            rows={5}
            rowsMax={5}
            // onChange={handleFieldChange}
            // value={values.title}
            variant="outlined"
          />

          <Divider />

          <CardActions className={classes.actions}>
            <IconButton edge="start">
              <DeleteIcon />
            </IconButton>
            <Button
              className={classes.cancelButton}
              // onClick={onCancel}
              variant="contained"
            >
              Cancel
            </Button>
            {mode === "add" ? (
              <Button
                className={classes.confirmButton}
                // onClick={handleAdd}
                variant="contained"
              >
                Add
              </Button>
            ) : (
              <Button
                className={classes.confirmButton}
                // onClick={handleEdit}
                variant="contained"
              >
                Save
              </Button>
            )}
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
