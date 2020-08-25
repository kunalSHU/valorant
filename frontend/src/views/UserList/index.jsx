import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layouts';

// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './style';

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    users: [],
    error: null,
    sortNameColumDirection: 'desc'
  };

  sortUsers(users, sortDirection) {
    const sortedUsers = users.sort((a, b) => {
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
    let { users, sortNameColumDirection } = this.state;

    if (sortNameColumDirection === 'desc') {
      this.setState({sortNameColumDirection: 'asc'})
    } else {
      this.setState({sortNameColumDirection: 'desc'})
    }

    this.setState({ users: this.sortUsers(users, this.state.sortNameColumDirection) });
  }

  async getAllUsers() {
    try {
      this.setState({ isLoading: true });
      let { users } = await getAllUsers();

      if (this.signal) {
        this.setState({
          isLoading: false,
          users: this.sortUsers(users, this.state.sortNameColumDirection)
        });

        this.fuse = new Fuse(users, {
          keys:['name', 'id', 'phone', 'street', 'zipCode', 'city']
        })

      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    // this.getAllUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  async searchUser(searchQuery) {
    // Show all users if list is empty
    // TODO fetching all users again on empty profileName search, cache users locally (pref improvement)
    if (searchQuery === '') {
      const { users } = await getAllUsers();
      this.setState({ users });
      return;
    } else {
      const users = this.fuse.search(searchQuery);
      const filteredUsers = users.map(user => user.item);
      this.setState({ users:filteredUsers });
      return;
    }
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

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

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        onSelect={this.handleSelect}
        sortDirection={this.state.sortNameColumDirection}
        sortNameColumn={this.sortNameColumn}
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Users">
        <div className={classes.root}>
          <UsersToolbar searchUser={event => this.searchUser(event.target.value)}/>
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
