import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Payment as PaymentIcon,
  PeopleOutlined as PeopleIcon,
  Code as CodeIcon,
  Store as StoreIcon
} from '@material-ui/icons';

// import { Status } from '../../../../../components';

// Component styles
import styles from './styles';

const statusColors = {
  'Completed': 'success',
  'Upcoming': 'info',
  'Awaiting Confirmation': 'warning',
  'Cancelled': 'danger'
};

class NotificationList extends Component {
  render() {
    const { className, classes, notifications, onSelect } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        {notifications.length > 0 ? (
          <Fragment>
            <div className={classes.header}>
              <Typography variant="h6">Appointment Notifications</Typography>
              <Typography
                className={classes.subtitle}
                variant="body2"
              >
                {notifications.length} new notifications
              </Typography>
            </div>
            <div className={classes.content}>
              <List component="div">
                {notifications.map(notification => (
                  <Link
                    key={Math.random()}
                    to="#"
                  >
                    <ListItem
                      className={classes.listItem}
                      component="div"
                      onClick={onSelect}
                    >
                      <ListItemText
                        classes={{ secondary: classes.listItemTextSecondary }}
                        primary={`Your appointment APPT-${notification.appointmentid} status has changed to ${notification.status_appt}`}
                        secondary={moment(notification.begins_at).format('DD/MM/YYYY @ hh:mm A')}
                      />
                    </ListItem>
                    <Divider />
                  </Link>
                ))}
              </List>
            </div>
          </Fragment>
        ) : (
          <div className={classes.empty}>
            { this.props.isLoading ?
              (
                <div>
                  <div className={classes.progressWrapper}>
                    <CircularProgress />
                  </div>
                  <Typography variant="h6">Getting all your notifications...</Typography>
                </div>
              ) : (
                <div>
                  <div className={classes.emptyImageWrapper}>
                    <img
                      alt="Empty list"
                      className={classes.emptyImage}
                      src="/images/empty.png"
                    />
                  </div>
                  <Typography variant="h4">There's nothing here...</Typography>
                </div>
              )
            }
          </div>
        )}
      </div>
    );
  }
}

NotificationList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  notifications: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

NotificationList.defaultProps = {
  notifications: [],
  onSelect: () => {}
};

export default withStyles(styles)(NotificationList);
