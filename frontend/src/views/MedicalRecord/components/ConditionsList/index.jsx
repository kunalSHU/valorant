import React, { Component } from 'react';

import * as LocalStorageProvider from '../../../../utils/local-storage-provider.js';

// Externals
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared services
import { getAllConditionsByAccountId } from '../../../../services/record';

// Custom components
import { ConditionsToolbar, ConditionsTable } from './components';

// Component styles
import styles from './style';

class ConditionsList extends Component {
  signal = true;

  state = {
    isLoading: false,
    conditions: [],
    error: null,
    sortNameColumDirection: 'desc'
  };

  sortConditions = (conditions, sortDirection) => {
    const sortedUsers = conditions.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    if (sortDirection === 'asc') {
      return sortedUsers;
    }

    return sortedUsers.reverse();

  }

  sortNameColumn = () => {
    let { conditions, sortNameColumDirection } = this.state;

    if (sortNameColumDirection === 'desc') {
      this.setState({sortNameColumDirection: 'asc'})
    } else {
      this.setState({sortNameColumDirection: 'desc'})
    }

    this.setState({ users: this.sortConditions(conditions, this.state.sortNameColumDirection) });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getAllConditionsByAccountId(
      LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.ACCOUNT_ID)
    )
    .then((conditions) => {
      if (conditions.length > 0) {
        this.setState({
          isLoading: false,
          conditions: this.sortConditions(conditions, this.state.sortNameColumDirection)
        });
  
        this.fuse = new Fuse(conditions, {
          keys:['allergyid', 'allergyname', 'otherfacts']
        })
      } else {
        throw Error();
      }
    })
    .catch(() => {
      this.setState({
        isLoading: false,
        error: "Could not retrieve all your conditions"
      });
    });
  }

  searchCondition = (searchQuery) => {

    if (searchQuery === '') {
      this.setState({ isLoading: true });
    getAllConditionsByAccountId(
      LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.ACCOUNT_ID)
    )
    .then((conditions) => {
      if (conditions.length > 0) {
        this.setState({
          isLoading: false,
          conditions: this.sortConditions(conditions, this.state.sortNameColumDirection)
        });
  
        this.fuse = new Fuse(conditions, {
          keys:['allergyid', 'allergyname', 'otherfacts']
        })
      } else {
        throw Error();
      }
    })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: "Could not retrieve all your conditions"
        });
      });
    } else {
      const conditions = this.fuse.search(searchQuery);
      const filteredConditions = conditions.map(condition => condition.item);
      this.setState({ 
        conditions: filteredConditions 
      });
    }
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, conditions, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (conditions.length === 0) {
      return <Typography variant="h6">There are no conditions</Typography>;
    }

    return (
      <ConditionsTable
        conditions={conditions}
        onSelect={this.handleSelect}
        sortDirection={this.state.sortNameColumDirection}
        sortNameColumn={this.sortNameColumn}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.title} component="div" variant="h4">
          Conditions
        </Typography>
        <ConditionsToolbar 
          className={classes.toolbar} 
          searchUser={event => this.searchCondition(event.target.value)}
        />
        <div className={classes.content}>{this.renderUsers()}</div>
      </div>
    );
  }
}

ConditionsList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConditionsList);
