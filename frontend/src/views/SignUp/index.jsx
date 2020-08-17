import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ReactSnackBar from "react-js-snackbar";
import { Formik} from 'formik';
import * as Yup from 'yup';
import {Form} from 'antd'
import {Card, CardContent, MenuItem, Divider, TableFooter} from '@material-ui/core';
import axios from 'axios';


// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from '../../common/validators';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

validate.validators.checked = validators.checked;

// Service methods
const signUp = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

const FormItem = Form.Item;
const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
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
    if (localStorage.getItem('isAuthenticated') === 'true') {
      const { history } = this.props;
      history.replace('/dashboard');
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
                console.log(response)
                
                this.setState({ Show: true, Showing: true });
                setTimeout(() => {
                    this.setState({ Show: false, Showing: false });
                }, 2500);  
                setTimeout(() => {
                    history.push('/sign-in')
                }, 1000);  
            }, (error) => {
                console.log(error);
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
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showFirstNameError =
      touched.firstName && errors.firstName ? errors.firstName[0] : false;
    const showLastNameError =
      touched.lastName && errors.lastName ? errors.lastName[0] : false;
    const showEmailError =
      touched.email && errors.email ? errors.email[0] : false;
    const showPasswordError =
      touched.password && errors.password ? errors.password[0] : false;
    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

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
                    Takamaru Ayako
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    Manager at inVision
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
                    Use your work email to create new account... it's free.
                  </Typography>
                  <ReactSnackBar Icon={<span></span>} Show={this.state.Show}>
                    Registered Successfully!
                </ReactSnackBar>
 
                    <CardContent>

                        <Formik initialValues={{email:"", password:"", confirmPassword:""}} 
                    validationSchema={validationSchema} onSubmit={(data) => {this.submitValues(data)}} validator={() => ({})}>

                        {({handleSubmit, handleChange, handleBlur, values, errors, touched, dirty, isValid}) => (
                            <Fragment>
                            <form onSubmit={handleSubmit}>
                                
                                <Grid item>
                                    <TextField className={classes.textField} type="text" helperText={touched.email && errors.email ? this.emailError(errors.email) : ""}
                                        onChange={handleChange} onBlur={handleBlur} value={values.email} 
                                        name="email"variant="outlined" placeholder="Email" label="Email"
                                        margin="dense"/>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.textField} type="password" helperText={touched.password && errors.password ? this.passwordError(errors.password) : ""}
                                        onChange={handleChange} onBlur={handleBlur} value={values.password} 
                                        name="password" variant="outlined" placeholder="Password" label="Password"
                                        margin="dense"/>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.textField} type="password" onChange={handleChange} helperText={touched.confirmPassword && errors.confirmPassword ? this.confirmPasswordError(errors.confirmPassword) : ""}
                                        onBlur={handleBlur} value={values.confirmPassword} 
                                        name="confirmPassword" variant="outlined" placeholder="Confirm Password" label="Confirm Password"
                                        margin="dense"/>
                                </Grid>
                            </form>
                            <br></br>
                            <Button variant="contained" color="primary" className={classes.signUpButton}
                                disabled={!dirty || errors.email || errors.password || errors.confirmPassword} 
                                onClick={handleSubmit}>
                                Submit
                            </Button>
                            </Fragment>
 
                        )}
                        </Formik>
     
                    </CardContent>
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
