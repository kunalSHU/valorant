import React, { Component } from 'react';

import * as LocalStorageProvider from '../../../../utils/local-storage-provider.js';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField, CircularProgress, Typography } from '@material-ui/core';
import {retrieveBasicInfoByAccountId} from '../../../../services/record/index'
// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  Status
} from '../../../../components';

// Component styles
import styles from './styles';

const sexes = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

class BasicInfo extends Component {
  state = {
    isLoading: false,
    isValid: false,
    values: {
      firstName: ' ',
      lastName: ' ',
      sex: sexes[0].label
    },
    empty: {},
    submitSuccess: false,
    showForm: false
  };

  submitForm = () => {
    const newState = { ...this.state };
    newState.submitSuccess = true;
    this.setState(newState);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    retrieveBasicInfoByAccountId(
      LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.ACCOUNT_ID)
    )
    .then(({
      firstName,
      lastName,
      sex
     }) => {
      this.setState({
        values: {
          firstName,
          lastName,
          sex
        },
        isLoading: false,
        showForm: true
      })
    })
    .catch((errMessage) => {
      console.error(errMessage)
      this.setState({ 
        isLoading: false, 
        showForm: false 
      })
    })
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    
    newState.values[field] = value;
    newState.isValid = true;
    
    if (newState.values['firstName'] === '' || newState.values['lastName'] === '') {
      newState.isValid = false;
    }

    this.setState(newState);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values, isLoading, showForm } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
        showForm ?
        (
          <Portlet
            {...rest}
            className={rootClassName}
          >
            <PortletHeader>
              <PortletLabel
                subtitle="Update your name and sex"
                title="Basic Information"
              />
            </PortletHeader>

            <PortletContent noPadding>
              <form>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    error={this.state.values['firstName'] === '' ? true : false}
                    helperText={this.state.values['firstName'] === '' ? 'First name cannot be empty' : null}
                    label="First name"
                    margin="dense"
                    onChange={event =>
                      this.handleFieldChange('firstName', event.target.value)
                    }
                    value={values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={this.state.values['lastName'] === '' ? true : false}
                    helperText={this.state.values['lastName'] === '' ? 'Last name cannot be empty' : null}
                    label="Last name"
                    margin="dense"
                    onChange={event =>
                      this.handleFieldChange('lastName', event.target.value)
                    }
                    value={values.lastName}
                    variant="outlined"
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    SelectProps={{ native: true }}
                    className={classes.textField}
                    label="Sex"
                    margin="dense"
                    onChange={event =>
                      this.handleFieldChange('sex', event.target.value)
                    }
                    select
                    value={values.sex}
                    variant="outlined"
                  >
                    {sexes.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
              </form>
            </PortletContent>

            <PortletFooter className={classes.portletFooter}>

              <Button color="primary" disabled={!this.state.isValid} onClick={this.submitForm} variant="contained">
                Update
              </Button>

              { this.state.submitSuccess &&
                <div className={classes.statusContainer}>
                  <Status className={classes.status} color="success" size="md"/>
                  <Typography variant="caption">
                    Information has been updated
                  </Typography>
                </div>
              }
            </PortletFooter>
          </Portlet>
        ) : (
          isLoading &&
          <div className={classes.progressWrapper}>
            <CircularProgress className={classes.progress} />
          </div>
        )
    );
  }
}

BasicInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

let newStyles;
[BasicInfo, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('BasicInfo', BasicInfo, styles);
export default withStyles(newStyles)(BasicInfo);
