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

class Export extends Component {
  render() {
    const { classes, className, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Download your data"
            title="Export"
          />
        </PortletHeader>
        <PortletContent />
          <Button
            className={classes.exportButton}
            color="primary"
            variant="outlined"
          >
            Export
          </Button>
      </Portlet>
    );
  }
}

Export.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

let newStyles;
[Export, newStyles] = require('../../../../common/customizers').customizers.customizeComponent('Export', Export, styles);
export default withStyles(newStyles)(Export);
