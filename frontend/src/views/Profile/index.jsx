import React, { Component } from 'react';

import * as LocalStorageProvider from '../../utils/local-storage-provider.js';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
/*Dash import here */
// import { Dashboard as DashboardLayout } from './Dashboard';

// Custom components
import { NameGender, Location } from './components';

import { postUserAddress, postUserInfo } from '../../services/record/index'

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class MedicalRecord extends Component {
  state = { tabIndex: 0, activeStep: 0, showStep1: true, showStep2: false, lastStepState: false,
          firstName: '', lastName: '', sex: '', phoneNumber: '', dateofbirth: '', street: '',
        postalCode: '', city: '', province: ''};

  nextStep = (firstName, lastName, phoneNumber, dateofbirth, sex) => {
    this.setState({
      showStep1: false,
      showStep2: true,
      activeStep: this.state.activeStep+1,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      dateofbirth: dateofbirth,
      sex: sex,
    })
  }

  back = () => {
    this.setState({
      showStep1: true,
      showStep2: false,
      activeStep: this.state.activeStep-1
    })
  }

  lastStep = (street, postalCode, city, province) => {
    this.setState({
      street: street,
      postalCode: postalCode,
      city: city,
      province: province
    })
    postUserAddress(street, postalCode, city, province)
    .then(() => 
      postUserInfo(
        this.state.firstName, 
        this.state.lastName, 
        this.state.phoneNumber, 
        this.state.dateofbirth,
        this.state.sex,
        LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.ACCOUNT_EMAIL)
      )
    );
  
    this.props.history.push('/dashboard')
    //window.location.reload(false);
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            {this.state.showStep1 ? 
            <Grid
              item
              lg={4}
              md={6}
              xl={8}
            >            
              <NameGender activeStep={this.state.activeStep} back={this.back} nextStep={this.nextStep}/>
            </Grid> : null}

            {this.state.showStep2 ? 
            <Grid
              item
              lg={4}
              md={6}
              xl={8}
              xs={12}
            >
              <Location activeStep={this.state.activeStep} back={this.back} nextStep={this.lastStep}/>
            </Grid> : null}
          </Grid>
        </div>
    );
  }
}

MedicalRecord.propTypes = {
  classes: PropTypes.object.isRequired
};

let newStyles;
[MedicalRecord, newStyles] = require('../../common/customizers').customizers.customizeComponent('MedicalRecord', MedicalRecord, styles);
export default withStyles(newStyles)(MedicalRecord);
