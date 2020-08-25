import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Badge,
  CircularProgress,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

// Shared services
import { getAllNotifications } from '../../../../services/notifications/notifications.js';

// Custom components
import { NotificationList } from './components';

// Component styles
import styles from './styles';

class Topbar extends Component {

  state = {
    notifications: [],
    notificationsCount: 0,
    notificationsEl: null,
    isLoading: false
  };

  getAllNotifications = () => {
    this.setState({ isLoading: true });

    getAllNotifications(localStorage.getItem("accountId"))
    .then((notifications) => {
      this.setState({ 
        notifications,
        isLoading: false
       });
      console.log(notifications)
    })
    .catch(errMessage => {
      console.error(errMessage);
      this.setState({
        isLoading: false
      })
    });
  }

  handleSignOut = () => {
    const { history } = this.props;

    localStorage.setItem('isAuthenticated', false);
    history.push('/sign-in');
  };

  handleShowNotifications = event => {
    this.getAllNotifications();
    this.setState({
      notificationsEl: event.currentTarget
    });
  };

  handleCloseNotifications = () => {
    this.setState({
      notificationsEl: null
    });
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    const { notifications, notificationsCount, notificationsEl } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showNotifications = Boolean(notificationsEl);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={onToggleSidebar}
              variant="text"
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            <IconButton
              className={classes.notificationsButton}
              onClick={this.handleShowNotifications}
            >
              <Badge
                badgeContent={notificationsCount}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={classes.signOutButton}
              onClick={this.handleSignOut}
            >
              <InputIcon />
            </IconButton>
          </Toolbar>
        </div>
        <Popover
          anchorEl={notificationsEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          onClose={this.handleCloseNotifications}
          open={showNotifications}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        > 
          <NotificationList
            isLoading={this.state.isLoading}
            notifications={notifications}
            onSelect={this.handleCloseNotifications}
          />
        </Popover>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

let newStyles;
[Topbar, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Topbar', Topbar, styles);

export default compose(withRouter, withStyles(newStyles))(Topbar);
