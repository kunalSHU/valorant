import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';

// Material icons
import {
  InfoOutlined as InfoIcon,
  EventAvailableOutlined as AppointmentsIcon,
  AssignmentIndOutlined as MedicalRecordIcon,
  FaceOutlined as AccountIcon,
  GroupOutlined as UsersIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

const dashboardListItemsByRoles = {
  'patient': [ 
    { linkTo: '/dashboard', icon: <AppointmentsIcon/>, linkText: 'Appointments' },
    { linkTo: '/account', icon: <AccountIcon/>, linkText: 'Account' },
    { linkTo: '/record', icon: <MedicalRecordIcon/>, linkText: 'Medical Record' },
  ],
  'receptionist': [ 
    { linkTo: '/dashboard', icon: <AppointmentsIcon/>, linkText: 'Appointments' },
    { linkTo: '/users', icon: <UsersIcon/>, linkText: 'Users' },
  ],
  'doctor': [ 
    { linkTo: '/dashboard', icon: <AppointmentsIcon/>, linkText: 'Appointments' },
  ],
}

class Sidebar extends Component {
  render() {
    const { classes, className } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="Valorant logo"
              className={classes.logoImage}
              src="/images/logos/logo.png" 
            />
          </Link>
        </div>

        <Divider className={classes.logoDivider} />
        
        <List component="div" disablePadding>
          {
            dashboardListItemsByRoles[this.props.roleType].map((listItem, i) => {
              return (
                <ListItem
                  activeClassName={classes.activeListItem}
                  className={classes.listItem}
                  component={NavLink}
                  key={i}
                  to={listItem.linkTo}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    {listItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary={listItem.linkText}
                  />
                </ListItem> 
              )
            })
          }
        </List>

        <Divider className={classes.listDivider} />

        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Support
            </ListSubheader>
          }
        >
          <ListItem
            className={classes.listItem}
            component="a"
            href="https://github.com/ShabazBadshah/valorant"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Source Code"
            />
          </ListItem>
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  roleType: PropTypes.string.isRequired,
};

let newStyles;
[Sidebar, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Sidebar', Sidebar, styles);
export default withStyles(newStyles)(Sidebar);
