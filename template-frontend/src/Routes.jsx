import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from './views/Dashboard';
import MedicalRecord from './views/MedicalRecord'
import Account from './views/Account';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';
import UserList from 'views/UserList';
import Profile from 'views/Profile';

import PatientAppointmentDetails from 'views/PatientAppointmentDetails';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Redirect
          exact
          from="/appointments"
          to="/dashboard"
        />
        <Route
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <Route
          component={MedicalRecord}
          exact
          path="/record"
        />
        <Route
          component={Account}
          exact
          path="/account"
        />
        <Route
          component={PatientAppointmentDetails}
          exact
          path="/appointments/:id"
        />
        <Route
          component={UserList}
          exact
          path="/users"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={Profile}
          exact
          path="/profile"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
