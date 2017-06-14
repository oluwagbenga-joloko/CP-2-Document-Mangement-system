import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/authentication/SignUp.jsx';
import Login from './components/authentication/Login.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';


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
