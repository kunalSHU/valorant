import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';
import _ from 'underscore';
import axios from 'axios';
// import history from '../history'

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Grid,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

// Service methods
const signIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignIn extends Component {
  state = {
    values: {
      email: '',
      password: ''
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  componentDidMount() {
    console.log('here')
    // Redirect to dashboard if the user is already authenticated (don't show sign-in page again)
    if (localStorage.getItem('isAuthenticated') === 'true') {
      const { history } = this.props;
      history.replace('/dashboard');
    } else {
      return;
    }
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

  // TODO @kunalSHU move logic out of views to services folder (this is tightly coupled)
  handleSignIn = async () => {
      const { history } = this.props;
      const { values } = this.state;
      axios.post('http://142.1.46.70:8082/account/auth', {
        emailAddress: values.email,
        password: values.password
      })
      .then((response) => {
        //account exists
        console.log(response)
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('Email', values.email);
        history.push('/profile')
        this.setState({ isLoading: true });
      })
      .catch ((error) => {
        localStorage.setItem('isAuthenticated', 'false');
        alert('Incorrect login credentials');
        this.setState({
          isLoading: false,
          serviceError: error
        });
      });
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

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

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
                    Sign in
                  </Typography>
                
                  <Typography
                    className={classes.sugestion}
                    variant="body1"
                  >
                    Login with email address
                  </Typography>
                  <div className={classes.fields}>
                    <TextField className={classes.textField} label="Email address" name="email"
                      onChange={event => this.handleFieldChange('email', event.target.value)}
                      type="text" value={values.email} variant="outlined"/>
                    {showEmailError && (
                      <Typography className={classes.fieldError} variant="body2">
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField className={classes.textField} label="Password" name="password"
                      onChange={event => this.handleFieldChange('password', event.target.value)}
                      type="password" value={values.password} variant="outlined"/>
                    {showPasswordError && (
                      <Typography className={classes.fieldError} variant="body2">
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button className={classes.signInButton} color="primary"
                      disabled={!isValid} onClick={this.handleSignIn} size="large" variant="contained">
                      Sign in now
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    Don't have an account?{' '}
                    <Link className={classes.signUpUrl} to="/sign-up">
                      Sign up
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

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

let newStyles;
[SignIn, newStyles] = require('../../common/customizers').customizers.customizeComponent('SignIn', SignIn, styles);
export default compose(
  withRouter,
  withStyles(newStyles)
)(SignIn);
