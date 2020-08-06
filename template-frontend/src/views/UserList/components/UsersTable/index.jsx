import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  Typography,
} from '@material-ui/core';


// Shared components
import { Portlet, PortletContent } from '../../../../components';

// Component styles
import styles from './styles';

class UsersTable extends Component {
  render() {
    const { classes, className, users } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Province</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Registration Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.address.state}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.phone}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(user.createdAt).format('DD/MM/YYYY')}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
