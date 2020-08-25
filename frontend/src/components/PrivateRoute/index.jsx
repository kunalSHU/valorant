import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as LocalStorageProvider from '../../utils/local-storage-provider.js';

const PrivateRoute = props => {
  const { component, path, ...rest } = props;

  return LocalStorageProvider.getItem(LocalStorageProvider.LS_KEYS.IS_AUTHENTICATED) === 'true' ? (
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
