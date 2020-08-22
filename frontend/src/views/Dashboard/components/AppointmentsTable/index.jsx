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
import {bookAppointment} from '../../../../services/booking/index'
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

  state = {
    isLoading: false,
    appointments: [],
    appointmentsTotal: 0,
    openAddBookingModal: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    getAllAppointmentsByAccountId(localStorage.getItem('accountId'))
      .then(appointments => {
        console.log(appointments)
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

  onAppointmentClicked = (appointmentId) => {
    const { history } = this.props;

    if (history) { 
      history.push(`/appointments/${appointmentId}`);
    }
  }

  handleAppointmentAdded = (addedAppointmentInfo) => {
    console.log(addedAppointmentInfo)
    console.log(this.state.appointments)
    console.log(typeof(addedAppointmentInfo.appointmentDate ))
    var time = moment(addedAppointmentInfo.appointmentDate).format('hh:mm:ss');
    console.log(time)
    console.log(moment.unix(time / 1000).format("hh:mm A"))
    //use axios to persist the appointment in the db


    const newAppt = {
      appointmentid: 9,
      appt_type: "In Person",
      begins_at: addedAppointmentInfo.appointmentDate,
      ends_at: addedAppointmentInfo.appointmentDate,
      doctorid: 1,
      doctor_full_name: "Swetha Maramganty",
      status_appt: "Awaiting Confirmation"
    }
    const date = new Date(newAppt.begins_at)
    const unixTimestamp = date.getTime();
    console.log(unixTimestamp)
    newAppt.begins_at = unixTimestamp;
    newAppt.ends_at = unixTimestamp;
    bookAppointment(newAppt)
    const appointments = this.state.appointments;
    appointments.push(newAppt);
    this.setState({ appointments: appointments })
    console.log('here')
    console.log(this.state.appointments)

  }

  handleAppointmentDeleted = (appointmentId) => {
    let { appointments } = this.state;
    // orders.filter(order => )
  }

  handleAppointmentUpdated = () => {
  }

  openBookingModal = () => {
    this.setState({ openAddBookingModal: true });
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

        { showAppointments && !isLoading ? (
          <PortletHeader className={classes.portletHeader} noDivider>
            <PortletLabel
              subtitle={`${appointmentsTotal} in total`}
              title="Your Appointments"
            />
            <PortletToolbar>
              <Button
                className={classes.newEntryButton}
                color="primary"
                onClick={() => this.openBookingModal()}
                size="small"
                variant="outlined"
              >
                Book Appointment
              </Button>
            </PortletToolbar>
          </PortletHeader>
        ) : null }
          
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
                      <TableCell align="left">Appointment Date</TableCell>
                      <TableCell align="left">Time</TableCell>
                      <TableCell align="left">Location</TableCell>
                      <TableCell align="left">Status</TableCell>
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
                        onClick={() => this.onAppointmentClicked(appointmentId)}
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AppointmentsTable));
