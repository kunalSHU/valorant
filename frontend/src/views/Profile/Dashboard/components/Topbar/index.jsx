import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import * as LocalStorageProvider from '../../../../../utils/local-storage-provider.js';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';

// Material icons
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Input as InputIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Topbar extends Component {

  handleSignOut = () => {
    const { history } = this.props;

    LocalStorageProvider.clearAll();
    
    history.push('/sign-in');
  };

  render() {
    const {
      classes,
      className,
      title,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;

    const rootClassName = classNames(classes.root, className);

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
              className={classes.signOutButton}
              onClick={this.handleSignOut}
            >
              <InputIcon />
            </IconButton>
          </Toolbar>
        </div>
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

export default compose(
  withRouter,
  withStyles(newStyles)
)(Topbar);
