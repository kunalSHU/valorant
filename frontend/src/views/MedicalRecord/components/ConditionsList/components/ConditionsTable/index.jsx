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

// import { getAllConditionsByAccountId } from '../../../../../../services/record';
 
class ConditionsTable extends Component {

  render() {
    const { 
      classes, 
      className, 
      conditions, 
      sortDirection, 
      sortNameColumn 
    } = this.props;

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
                  .map(({
                    allergyid: id, 
                    allergyname: name, 
                    otherfacts: description
                  }) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={id}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {id}
                      </TableCell>
                      <TableCell className={classes.noWrap}>
                        {description}
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
  conditions: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  sortDirection: PropTypes.string.isRequired,
  sortNameColumn: PropTypes.func,
};

ConditionsTable.defaultProps = {
};

export default withStyles(styles)(ConditionsTable);
