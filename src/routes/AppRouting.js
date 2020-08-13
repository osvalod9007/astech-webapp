import React from 'react';
//import AuthContext from '../context/auth/AuthContext';
import { astechAuth } from '../helper/client0Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import PrivateRoute from './private/PrivateRoute';
//import PublicRoute from './public/PublicRoute';
import Dashboard from '../components/pages/dashboard';
import ForgotPassword from '../components/pages/forgot';
//import axios from 'axios';

export default function AuthExample() {
  let auth = astechAuth();

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              window.location.href = auth.code.getUri();
              return null;
            }}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </Router>
  );
}
