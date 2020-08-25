import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from './components';

// Views
import Dashboard from './views/Dashboard';
import MedicalRecord from './views/MedicalRecord'
import Account from './views/Account';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import NotFound from './views/NotFound';
import Profile from 'views/Profile';

import PatientAppointmentDetails from 'views/PatientAppointmentDetails';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          component={Dashboard}
          exact
          from="/"
          to="/dashboard"
        />
        <PrivateRoute
          exact
          from="/appointments"
          to="/dashboard"
        />
        <PrivateRoute
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <PrivateRoute
          component={MedicalRecord}
          exact
          path="/record"
        />
        <PrivateRoute
          component={Account}
          exact
          path="/account"
        />
        <PrivateRoute
          component={PatientAppointmentDetails}
          exact
          path="/appointments/:id"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <PrivateRoute
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
