import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
/*Dash import here */
// import { Dashboard as DashboardLayout } from './Dashboard';

// Custom components
import { NameGender, Location } from './components';
import { Button, TextField, Typography } from '@material-ui/core';
import Stepper from 'react-stepper-horizontal';
// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  Status
} from '../../components';
import {postUserAddress, postUserInfo} from '../../services/record/index'

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

    console.log(firstName)
    console.log(lastName)
    console.log(sex)
    console.log("this is DOB")
    console.log(dateofbirth)   
    //console.log(dateofbirth.format('YYYY-MM-DD'))
    console.log(typeof(dateofbirth))
    console.log(dateofbirth instanceof Object)
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

    console.log("in here")
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    console.log(this.state.sex)
    console.log(this.state.dateofbirth)
    console.log(this.state.phoneNumber)
    

  }

  back = () => {
    this.setState({
      showStep1: true,
      showStep2: false,
      activeStep: this.state.activeStep-1
    })
  }

  lastStep = (street, postalCode, city, province) => {
    console.log("last step clicked")
    console.log(street)
    console.log(postalCode)
    console.log(city)
    console.log(province)
    this.setState({
      street: street,
      postalCode: postalCode,
      city: city,
      province: province
    })
    alert("Profile Completed!")
    //Post user address first
    postUserAddress(street, postalCode, city, province)

    //get the email from localstorage
    postUserInfo(this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.dateofbirth,
      this.state.sex, localStorage.getItem("Email"))
    
    const { history } = this.props;
    

    //make call to the record file in services, post address first with the id, then patient info


    history.push('/dashboard')
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
            {this.state.showStep1 ? <Grid
              item
              lg={4}
              md={6}
              xl={8}
              xs={12}
            >
              <NameGender activeStep={this.state.activeStep} back={this.back} nextStep={this.nextStep}/>
            </Grid> : null}

            {this.state.showStep2 ? <Grid
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