import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as LocalStorageProvider from '../../utils/local-storage-provider.js';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import ReactSnackBar from "react-js-snackbar";
import { Formik} from 'formik';
import * as Yup from 'yup';
import {CardContent } from '@material-ui/core';
import axios from 'axios';

// Shared utilities
import validators from '../../common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

// const FormItem = Form.Item;
const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
// eslint-disable-next-line no-useless-escape
const specialCharacterRegex = /(?=.[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?])/;

const validationSchema  = Yup.object({
  email: Yup
  .string()
  .label("Email")
  .email()
  .required("Required"),
  password: Yup
  .string()
  .label("Password")
  .required("Required")
  .min(6, "Password must be atleast 6 characters")
  .max(128, "Maximum password length is 128 characters, please shorten it")
  .matches(lowercaseRegex, 'Atleast one lowercase letter required')
  .matches(uppercaseRegex, 'Atleast one uppercase letter required')
  .matches(numericRegex, 'Atleast one number required')
  .matches(specialCharacterRegex, 'Atleast one special character required'),
  confirmPassword: Yup
  .string()
  .required()
  .label("Confirm Password")
  .test("password-match", "Passwords do not match", function(value) {
      return this.parent.password === value;
  })
})

class SignUp extends Component {
  state = {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      policy: null
    },
    isValid: false,
    isLoading: false,
    submitError: null,
    Show: false,
    Showing: false
  };


  componentDidMount() {
    // Redirect to dashboard if the user is already authenticated (don't show sign-up page again)
    if (LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.IS_AUTHENTICATED) === 'true') {
      this.props.history.replace('/dashboard');
    } else {
      return;
    }
  }

  emailError = (errEmail) => {
    return(
        <p style={{color:"red"}}>{errEmail}</p>
    )
  }

  confirmPasswordError = (errconfirmPassword) => {
      return(
          <p style={{color:"red"}}>{errconfirmPassword}</p>
      )
  }

  passwordError = (errPassword) => {
      return(
          <p style={{color:"red"}}>{errPassword}</p>
      )
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  submitValues = (data) => {
    const { history } = this.props;

    axios.get(`http://142.1.46.70:8082/account/find?email=${data.email}`)
    .then((response) => {
        if(Object.keys(response.data.data.foundAccount).length===0){
            axios.post('http://142.1.46.70:8082/account/create', {
                emailAddress: data.email,
                password: data.password
            })
            .then((response) => {
                this.setState({ Show: true, Showing: true });
                setTimeout(() => {
                    this.setState({ Show: false, Showing: false });
                }, 2500);  
                setTimeout(() => {
                    history.push('/sign-in')
                }, 1000);  
            }, (error) => {
                console.error(error);
            });
        }
        else {
            alert('Account with that email address already exists!');
        }
    })  
    return;
  }

  render() {
    const { classes } = this.props;
    // const {
    //   values,
    //   touched,
    //   errors,
    //   isValid,
    //   submitError,
    //   isLoading
    // } = this.state;

    // const showFirstNameError =
    //   touched.firstName && errors.firstName ? errors.firstName[0] : false;
    // const showLastNameError =
    //   touched.lastName && errors.lastName ? errors.lastName[0] : false;
    // const showEmailError =
    //   touched.email && errors.email ? errors.email[0] : false;
    // const showPasswordError =
    //   touched.password && errors.password ? errors.password[0] : false;
    // const showPolicyError =
    //   touched.policy && errors.policy ? errors.policy[0] : false;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Valorant
                  
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    Helping you recieve the care you deserve faster!
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.contentBody}>
              <form className={classes.form}>

                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new account
                </Typography>

                <Typography
                  className={classes.subtitle}
                  variant="body1"
                >
                  Create an account to get started
                </Typography>

                <ReactSnackBar Icon={<span />} Show={this.state.Show}>
                  Registered Successfully!
                </ReactSnackBar>

                    <Formik 
                      initialValues={{email:"", password:"", confirmPassword:""}} 
                      onSubmit={(data) => {this.submitValues(data)}} 
                      validationSchema={validationSchema} 
                      validator={() => ({})}
                    >

                    {({handleSubmit, handleChange, handleBlur, values, errors, touched, dirty}) => (
                      <Fragment>
                        <form onSubmit={handleSubmit}>
                            
                            <Grid item>
                              <TextField 
                                className={classes.textField} 
                                helperText={touched.email && errors.email ? this.emailError(errors.email) : ""} 
                                label="Email"
                                margin="dense" 
                                name="email" 
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                placeholder="Email" 
                                type="text" 
                                value={values.email}
                                variant="outlined"
                              />
                            </Grid>

                            <Grid item>
                              <TextField 
                                className={classes.textField} 
                                helperText={touched.password && errors.password ? this.passwordError(errors.password) : ""} 
                                label="Password"
                                margin="dense" name="password" 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                placeholder="Password" 
                                type="password" 
                                value={values.password}
                                variant="outlined"
                              />
                            </Grid>

                            <Grid item>
                              <TextField 
                                className={classes.textField}
                                helperText={touched.confirmPassword && errors.confirmPassword ? this.confirmPasswordError(errors.confirmPassword) : ""} 
                                label="Confirm Password" 
                                margin="dense"
                                name="confirmPassword" 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                placeholder="Confirm Password"
                                type="password"
                                value={values.confirmPassword}
                                variant="outlined"
                              />
                            </Grid>
                        </form>

                        <br />
                        <Button
                          className={classes.signUpButton}    
                          color="primary"
                          disabled={!dirty || errors.email || errors.password || errors.confirmPassword} 
                          onClick={handleSubmit}
                          variant="contained" 
                        >
                            Create account
                        </Button>
                      </Fragment>
                    )}
                    </Formik>
                <Typography
                  className={classes.signIn}
                  variant="body1"
                >
                  Have an account?{' '}
                  <Link
                    className={classes.signInUrl}
                    to="/sign-in"
                  >
                    Sign In
                  </Link>
                </Typography>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

let newStyles;
[SignUp, newStyles] = require('../../common/customizers').customizers.customizeComponent('SignUp', SignUp, styles);
export default compose(
  withRouter,
  withStyles(newStyles)
)(SignUp);
