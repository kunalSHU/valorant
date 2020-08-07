import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
} from '../../../../components';

// Component styles
import styles from './styles';

class Delete extends Component {
  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle="Delete your account"
            title="Delete"
          />
        </PortletHeader>
        <PortletContent />
          <Button className={classes.deleteButton} variant="outlined">
            Delete
          </Button>
      </Portlet>
    );
  }
}

Delete.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Delete, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Delete', Delete, styles);
export default withStyles(newStyles)(Delete);
