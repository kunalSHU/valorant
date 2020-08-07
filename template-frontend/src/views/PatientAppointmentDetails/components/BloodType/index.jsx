import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography } from '@material-ui/core';

// Material icons
import {
  Opacity as BloodTypeIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from '../../../../components';

// Component styles
import styles from './styles';

class BloodType extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper
        {...rest}
        className={rootClassName}
      >
        <div className={classes.content}>
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="body2"
            >
              Blood
            </Typography>
            <Typography
              className={classes.value}
              variant="h3"
            >
              O+
            </Typography>
          </div>
          <div className={classes.iconWrapper}>
            <BloodTypeIcon className={classes.icon} />
          </div>
        </div>
      </Paper>
    );
  }
}

BloodType.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BloodType);
