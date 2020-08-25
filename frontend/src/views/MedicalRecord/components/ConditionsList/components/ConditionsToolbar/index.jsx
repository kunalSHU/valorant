import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Shared components
import { SearchInput } from '../../../../../../components';

// Component styles
import styles from './styles';

class ConditionsToolbar extends Component {
  render() {
    const { classes, className, searchUser, hide } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      !hide && (
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              onChange={searchUser}
              placeholder="Search conditions"
            />
            <span className={classes.spacer} />
          </div>
        </div>
      )
    );
  }
}

ConditionsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  hide: PropTypes.bool,
  searchUser: PropTypes.func.isRequired
};

export default withStyles(styles)(ConditionsToolbar);
