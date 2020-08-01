import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import LoginPage from "./pages/loginPage";
import GeneralPage from "./pages/generalPage";
import BillingPage from "./pages/billingPage";
import AppointmentsPage from "./pages/appointmentsPage";
import RegisterPage from "./pages/registerPage";


import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/general" component={GeneralPage} />
          <Route exact path="/billing" component={BillingPage} />
          <Route exact path="/appointments" component={AppointmentsPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
