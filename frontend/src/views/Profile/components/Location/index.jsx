import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField, Typography } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  Status
} from '../../../../components';
import Stepper from 'react-stepper-horizontal';

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
      postalCode: 'L1M 9T2',
      street: 'Dovehouse Drive',
      city: 'Mississauga',
      province: provinces[0].label
    },
    empty: {},
  };

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
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader style={{height: "85px"}}>
          <Stepper activeStep={this.props.activeStep} steps={[{title: 'Basic Info'}, {title: 'Location'}]} />
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
                classNameclassName={classes.textField}
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
          <Button color="primary" onClick={this.props.back} variant="contained">
            Back
          </Button>
          <Button color="primary" onClick={() => this.props.nextStep(this.state.values.street, this.state.values.postalCode,
            this.state.values.city, this.state.values.province)} variant="contained"
          >
            Finish
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
    );
  }
}

Location.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Location, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Location', Location, styles);
export default withStyles(newStyles)(Location);
