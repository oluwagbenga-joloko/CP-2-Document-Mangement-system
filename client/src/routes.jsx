import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx'


const routes = (
  <div>
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/Dashboard" component={Dashboard} />
    </Switch>
  </div>
);
export default routes;
