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


class Notes extends Component {
  state = {
    values: {
      notes: ''
    },
    submitSuccess: false
  };

  submitForm = () => {
    this.setState({ submitSuccess: true })
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
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
            subtitle="Notes"
            title="Notes"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form>
            <div className={classes.field}>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                name="title"
                onChange={event =>
                  this.handleFieldChange('notes', event.target.value)
                }                
                rows={8}
                value={this.state.values['notes']}
                variant="outlined"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button 
            color="primary" 
            variant="contained" 
            onClick={this.submitForm}
          >
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

Notes.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Notes, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Notes', Notes, styles);
export default withStyles(newStyles)(Notes);
