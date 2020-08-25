import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layouts';

// Custom components
import { Password, Export, Delete } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Account">
        <div className={classes.root}>
          <Grid
            container
            spacing={2}
          >
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <Password />
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <Export />
            </Grid> */}

            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <Delete />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

let newStyles;
[Account, newStyles] = require('../../common/customizers').customizers.customizeComponent('Account', Account, styles);
export default withStyles(newStyles)(Account);
