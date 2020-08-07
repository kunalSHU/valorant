import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';


// Shared components
import { Portlet, PortletContent } from '../../../../../../components';

// Component styles
import styles from './styles';

class ConditionsTable extends Component {
  render() {
    const { classes, className, conditions, sortDirection, sortNameColumn } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                  <TableSortLabel
                    active
                    direction={sortDirection}
                    onClick={sortNameColumn}
                  >
                    Condition Name
                  </TableSortLabel>  
                  </TableCell>
                  <TableCell align="left">Condition ID</TableCell>
                  <TableCell align="left">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {conditions
                  .map(condition => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={condition.id}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {condition.name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {condition.id}
                      </TableCell>
                      <TableCell className={classes.noWrap}>
                        {condition.description}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </PortletContent>
      </Portlet>
    );
  }
}

ConditionsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  sortDirection: PropTypes.string.isRequired,
  sortNameColumn: PropTypes.func,
  users: PropTypes.array.isRequired
};

ConditionsTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(ConditionsTable);
