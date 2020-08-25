import React, { Component } from 'react';
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
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';

// Component styles
import styles from './styles';

// Form validation schema
import schema from './schema';

import { authenticateUser } from '../../services/user/index.js';

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
    // Redirect to dashboard if the user is already authenticated (don't show sign-in page again)
    const { history } = this.props;
    localStorage.getItem('isAuthenticated') === 'true' ? history.replace('/dashboard') : history.replace('/sign-in')
  }

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 500);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = () => {
    this.setState({ isLoading: true });

    const { email, password } = this.state.values;

    console.log(password);

    authenticateUser(email, password)
    .then(({ isAuthenticated, errMessage }) => {
        if (isAuthenticated === true) {
            this.props.history.replace('/dashboard');
        } else {
          this.setState({
            isLoading: false,
            submitError: errMessage,
            values: { 
              email, 
              password: '' 
            }
          });
        }
    })
    .catch(err => {
      console.error(err);
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
                    Sign in
                  </Typography>
                
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    Login with your email address
                  </Typography>
                  <div className={classes.fields}>
                    <TextField 
                      className={classes.textField} 
                      label="Email address" name="email"
                      onChange={event => this.handleFieldChange('email', event.target.value)}
                      type="text" value={values.email} variant="outlined"
                    />
                    {showEmailError && (
                      <Typography className={classes.fieldError} variant="body2">
                        {errors.email[0]}
                      </Typography>
                    )}
                    <TextField className={classes.textField} 
                      label="Password" name="password"
                      onChange={event => this.handleFieldChange('password', event.target.value)}
                      type="password" 
                      value={values.password} 
                      variant="outlined"
                    />
                    {showPasswordError && (
                      <Typography className={classes.fieldError} 
                        variant="body2"
                      >
                        {errors.password[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography 
                      className={classes.submitError} 
                      variant="body2"
                    >
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton} 
                      color="primary"
                      disabled={!isValid} 
                      onClick={() => this.handleSignIn()} 
                      size="large" 
                      variant="contained"
                    >
                      Sign in
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
