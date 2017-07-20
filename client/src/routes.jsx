import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/authentication/SignUp';
import Login from './components/authentication/Login';
import Dashboard from './components/dashboard/Dashboard';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/Dashboard" component={Dashboard} />
    </Switch>
  </div>
);
export default routes;
