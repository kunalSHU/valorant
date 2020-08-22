import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
  Modal
} from '@material-ui/core';


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
} from '../../../../components';

import BookAppointment from './components/BookAppointment.jsx';

// Component styles
import styles from './styles';

import { getAllAppointmentsByAccountId } from '../../../../services/booking/index.js';

const statusColors = {
  'Completed': 'success',
  'Upcoming': 'info',
  'Awaiting Confirmation': 'warning',
  'Cancelled': 'danger'
};

class AppointmentsTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    appointments: [],
    appointmentsTotal: 0,
    openAddBookingModal: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    getAllAppointmentsByAccountId(localStorage.getItem('accountId'))
    .then(appointments => {
      this.setState({
        appointments: appointments,
        appointmentsTotal: appointments.length,
        isLoading: false,
        showAppointments: true
      })
    })
    .catch(err => {
      this.setState({
        showAppointments: false,
        isLoading: false,
        err,
      });
    });
  }

  componentWillUnmount() {
    this.signal = false;
  }
  
  onAppointmentClicked = () => {
    // const history = ;
    const { history } = this.props;
    if(history) history.push('/appointments/2');
  }

  handleAppointmentAdded = (addedAppointmentInfo) => {
    console.log(addedAppointmentInfo)
  }

  handleAppointmentDeleted = (appointmentId) => {
    let { appointments } = this.state;
    // orders.filter(order => )
  }

  handleAppointmentUpdated = () => {
  }

  handleClose = () => {
    const newState = { ...this.state };
    this.setState({ openAddBookingModal: !newState.openAddBookingModal })
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, appointments, appointmentsTotal } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showAppointments = !isLoading && appointments.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${appointmentsTotal} in total`}
            title="Your Appointments"
          />
          <PortletToolbar>
            <Button
              className={classes.newEntryButton}
              color="primary"
              onClick={this.onAppointmentClicked}
              size="small"
              variant="outlined"
            >
              Book Appointment
            </Button>
          </PortletToolbar>
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent className={classes.portletContent} noPadding>

            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}

            <div>
              <Modal open={this.state.openAddBookingModal}>
                <BookAppointment 
                  mode="add"
                  onAppointmentAdded={this.handleAppointmentAdded}
                  onAppointmentDeleted={this.handleAppointmentDeleted}
                  onAppointmentUpdated={this.handleAppointmentUpdated}
                  onCancel={this.handleClose}
                />
              </Modal>

              {showAppointments && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Appointment ID</TableCell>
                      <TableCell align="left">Doctor</TableCell>
                      <TableCell align="left">
                        Appointment Date
                      </TableCell>
                      <TableCell align="left">Time</TableCell>
                      <TableCell align="left">Location</TableCell>
                      <TableCell align="left">Status</TableCell>
                      {/* Empty cell for arrow */}
                      {/* <TableCell align="left"><div/></TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map(({ 
                      appointmentid: appointmentId,
                      doctor_full_name: doctorFullName,
                      begins_at: appointmentDateUnixTimestamp, 
                      status_appt: appointmentStatus, 
                      appt_type: appointmentLocation 
                    }) => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={appointmentId}
                        onClick={this.onAppointmentClicked}
                      >
                        <TableCell>{`APPT-${appointmentId}`}</TableCell>
                        <TableCell className={classes.customerCell}>
                          {doctorFullName || "Not Found"}
                        </TableCell>
                        <TableCell>
                          {moment.unix(appointmentDateUnixTimestamp / 1000).format('DD/MM/YYYY')}
                        </TableCell>
                    <TableCell>{moment.unix(appointmentDateUnixTimestamp / 1000).format("hh:mm A")}</TableCell>
                        <TableCell>{appointmentLocation}</TableCell>
                        <TableCell>
                          <div className={classes.statusWrapper}>
                            <Status
                              className={classes.status}
                              color={statusColors[appointmentStatus]}
                              size="sm"
                            />
                            {appointmentStatus}
                          </div>
                        </TableCell>
                        {/* <TableCell className={classes.arrow}>
                          <ArrowForward/>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

AppointmentsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(AppointmentsTable));
