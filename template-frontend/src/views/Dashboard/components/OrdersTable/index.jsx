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
  Modal
} from '@material-ui/core';


import {
  ArrowForward as ArrowForward
} from '@material-ui/icons';

// Shared services
import { getOrders } from '../../../../services/order';

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

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refund: 'danger'
};

class OrdersTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    orders: [],
    ordersTotal: 0,
    open: false
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders, ordersTotal } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders,
          ordersTotal
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getOrders(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }
  
  onAppointmentClicked = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, orders, ordersTotal } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${ordersTotal} in total`}
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
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            

            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            <div>

              <Modal
                open={this.state.open}
              >
                <BookAppointment mode="add" onCancel={this.handleClose}/>
              </Modal>

              {showOrders && (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Appointment ID</TableCell>
                      <TableCell align="left">Doctor</TableCell>
                      <TableCell
                        align="left"
                        sortDirection="desc"
                      >
                        <Tooltip
                          enterDelay={300}
                          title="Sort"
                        >
                          <TableSortLabel
                            active
                            direction="desc"
                          >
                          Appointment Date
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">Time</TableCell>
                      <TableCell align="left">Location</TableCell>
                      <TableCell align="left">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={order.id}
                      >
                        <TableCell>{order.id}</TableCell>
                        <TableCell className={classes.customerCell}>
                          {order.customer.name}
                        </TableCell>
                        <TableCell>
                          {moment(order.createdAt).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>1:00PM</TableCell>
                        <TableCell>Online</TableCell>
                        <TableCell>
                          <div className={classes.statusWrapper}>
                            <Status
                              className={classes.status}
                              color={statusColors[order.status]}
                              size="sm"
                            />
                            {order.status}
                          </div>
                        </TableCell>
                        <TableCell className={classes.arrow}>
                          <ArrowForward/>
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

OrdersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
