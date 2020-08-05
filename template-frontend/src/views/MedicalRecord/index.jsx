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
import { NameGender, Location, Links } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class MedicalRecord extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Account">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={8}
              xs={12}
            >
              <NameGender />
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              xl={8}
              xs={12}
            >
              <Location />
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              xl={8}
              xs={12}
            >
              <Links />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

MedicalRecord.propTypes = {
  classes: PropTypes.object.isRequired
};

let newStyles;
[MedicalRecord, newStyles] = require('../../common/customizers').customizers.customizeComponent('MedicalRecord', MedicalRecord, styles);
export default withStyles(newStyles)(MedicalRecord);
