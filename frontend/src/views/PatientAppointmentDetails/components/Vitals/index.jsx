import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validate from 'validate.js';
// Material helpers
import { withStyles, InputAdornment } from '@material-ui/core';

// Material components
import { Button, TextField, Typography } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  Status,
  CircularProgress,
} from '../../../../components';

// Component styles
import styles from './styles';

const bloodTypes = [
  {
    value: 'o+',
    label: 'O+'
  },
  {
    value: 'o-',
    label: 'O-'
  },
  {
    value: 'a+',
    label: 'A+'
  },
  {
    value: 'a-',
    label: 'A-'
  },
  {
    value: 'b+',
    label: 'B+'
  },
  {
    value: 'b-',
    label: 'B-'
  },
  {
    value: 'ab+',
    label: 'AB+'
  },
  {
    value: 'ab-',
    label: 'AB-'
  },
];

class Vitals extends Component {
  state = {
    isValid: false,
    values: {
      weight: '173',
      height: '180',
      bloodType: bloodTypes[0].label
    },
    empty: {},
    submitSuccess: false
  };

  submitForm = () => {
    const newState = { ...this.state };
    newState.submitSuccess = true;
    this.setState(newState);
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    
    newState.values[field] = value;

    newState.isValid = true;
    if (newState.values['weight'] === '' || newState.values['height'] === '') {
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
        <PortletHeader>
          <PortletLabel
            subtitle="Patient's vital information"
            title="Vitals"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                error={this.state.values['weight'] === '' ? true : false}
                helperText={this.state.values['weight'] === '' ? 'Weight cannot be empty' : null}
                InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment>}}
                label="Weight"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('weight', event.target.value)
                }
                value={values.weight}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                error={this.state.values['height'] === '' ? true : false}
                helperText={this.state.values['height'] === '' ? 'Height cannot be empty' : null}
                InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment>}}
                label="Height"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('height', event.target.value)
                }
                value={values.height}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Blood Type"
                margin="dense"
                onChange={event =>
                  this.handleFieldChange('bloodType', event.target.value)
                }
                select
                SelectProps={{ native: true }}
                value={values.bloodType}
                variant="outlined"
              >
                {bloodTypes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="primary" variant="contained" disabled={!this.state.isValid} onClick={this.submitForm}>
            Update
          </Button>
          { this.state.submitSuccess &&
            <div className={classes.statusContainer}>
              <Status className={classes.status} size='md' color='success'/>
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

Vitals.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Vitals, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Vitals', Vitals, styles);
export default withStyles(newStyles)(Vitals);
