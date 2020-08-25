import React, { Component } from 'react';

import * as LocalStorageProvider from '../../../../utils/local-storage-provider.js';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { 
  Button, 
  CircularProgress,
  TextField, 
  Typography
 } from '@material-ui/core';
import { retrieveAddressInfoByAddressId } from '../../../../services/record/index'

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

const provinces = [
  { value: 'ontario', label: 'Ontario' },
  { value: 'quebec', label: 'Quebec' },
  { value: 'nova scotia', label: 'Nova Scotia' },
  { value: 'new brunswick', label: 'New Brunswick' },
  { value: 'manitoba', label: 'Manitoba' },
  { value: 'british columbia', label: 'British Columbia' },
  { value: 'prince edward island', label: 'Prince Edward Island' },
  { value: 'saskatchewan', label: 'Saskatchewan' },
  { value: 'alberta', label: 'Alberta' },
  { value: 'newfoundland and labrador', label: 'Newfoundland and Labrador' },
  { value: 'northwest territories', label: 'Northwest Territories' },
  { value: 'yukon', label: 'Yukon' },
  { value: 'nunavut', label: 'Nunavut' }
];

class Location extends Component {
  state = {
    isValid: false,
    values: {
      postalCode: ' ',
      street: ' ',
      city: ' ',
      province: provinces[0].label
    },
    empty: {},
    showForm: false,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    retrieveAddressInfoByAddressId(this.props.addressid)
    .then((response) => {
      const data = response.data.data.getAddressById;

      const {
        city,
        postal_code: postalCode,
        streetname: streetName,
        province,
      } = data[0];

      this.setState({
        values: {
          postalCode,
          street: streetName,
          city,
          province
        },
        isLoading: false,
        showForm: true
      })
    })
    .catch(err => {
      console.error(err);
      this.setState({ 
        isLoading: false, 
        showForm: false 
      })
    });
  }


  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    
    newState.values[field] = value;

    newState.isValid = true;
    if (newState.values['postalCode'] === '' || newState.values['street'] === '' || newState.values['city'] === '') {
      newState.isValid = false;
    }

    this.setState(newState);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values, showForm, isLoading } = this.state;

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
              subtitle="Update your location information"
              title="Location"
            />
          </PortletHeader>
          <PortletContent noPadding>
            <form
              autoComplete="off"
            >
              <div className={classes.field}>
                <TextField
                  className={classes.textField}
                  error={this.state.values['street'] === '' ? true : false}
                  helperText={this.state.values['street'] === '' ? 'Street cannot be empty' : null}
                  label="Street"
                  margin="dense"
                  onChange={event =>
                    this.handleFieldChange('street', event.target.value)
                  }
                  value={values.street}
                  variant="outlined"
                />
              </div>
              <div  className={classes.field}>
                <TextField
                  className={classes.textField}
                  error={this.state.values['postalCode'] === '' ? true : false}
                  helperText={this.state.values['postalCode'] === '' ? 'Post code cannot be empty' : null}
                  label="Postal Code"
                  margin="dense"
                  onChange={event =>
                    this.handleFieldChange('postalCode', event.target.value)
                  }
                  value={values.postalCode}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={this.state.values['city'] === '' ? true : false}
                  helperText={this.state.values['city'] === '' ? 'City cannot be empty' : null}
                  label="City"
                  margin="dense"
                  onChange={event =>
                    this.handleFieldChange('city', event.target.value)
                  }
                  value={values.city}
                  variant="outlined"
                />
              </div>
              <div className={classes.field}>
                <TextField
                  SelectProps={{ native: true }}
                  className={classes.textField}
                  label="Province"
                  margin="dense"
                  onChange={event =>
                    this.handleFieldChange('province', event.target.value)
                  }
                  select
                  value={values.province}
                  variant="outlined"
                >
                  {provinces.map(option => (
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

Location.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  addressid: PropTypes.string.isRequired
};

let newStyles;
[Location, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Location', Location, styles);
export default withStyles(newStyles)(Location);
