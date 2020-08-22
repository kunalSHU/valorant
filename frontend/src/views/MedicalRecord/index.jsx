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
import { BasicInfo, Location, ConditionsList, WeightTracker, HeightTracker, BloodType } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class MedicalRecord extends Component {
  state = { 
    shouldShowComponent: {
      'BasicInfo': true,
      'Location': true,
    }
  };

  shouldRenderGridItem = (componentName, shouldRenderGridItem) => {
    this.setState({ 
      shouldShowComponent: {
        componentName: shouldRenderGridItem 
      }
    })
  }


  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Medical Record">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >

            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <WeightTracker />
            </Grid>

            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <HeightTracker />
            </Grid>

            <Grid
              item
              lg={3}
              sm={12}
              xl={3}
              xs={12}
            >
              <BloodType />
            </Grid>
            
            { this.state.shouldShowComponent['BasicInfo'] && (
              <Grid
                item
                lg="auto"
                md="auto"
                xl={4}
                xs={12}
              >
                <BasicInfo shouldRenderGridItem={(shouldRenderGridItem) => this.shouldRenderGridItem('BasicInfo', shouldRenderGridItem)}/>
              </Grid>
            )}

            <Grid
              item
              lg={6}
              md={6}
              xl={4}
              xs={12}
            >
              <Location/>
            </Grid>
            
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <ConditionsList />
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
