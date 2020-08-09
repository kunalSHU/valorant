import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  const { component, path, ...rest } = props;

  return localStorage.getItem("isAuthenticated") === 'true' ? (
    <Route 
      component={component} 
      exact
      path={path} 
      {...rest} 
    />
    ) : (
      <Redirect to="/sign-in" />
  );
};

export default PrivateRoute;
