import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Divider, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
});

class Footer extends Component {
  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <Divider />
        <Typography
          className={classes.company}
          variant="body1"
        >
          &copy; Valorant. 2020
        </Typography>
        <Typography variant="caption">
          Created by Shabaz Badshah, Swetha Maramganty, Kunal Shukla, Muhammad Waleed
        </Typography>
      </div>
    );
  }
}

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Footer, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Footer', Footer, styles);
export default withStyles(newStyles)(Footer);
