/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import toastr from 'toastr';
import createBrowserHistory from 'history/createBrowserHistory';
import configStore from './store/configStore';
import routes from './routes';
import './styles/styles.scss';
import '../../node_modules/sweetalert/dist/sweetalert.css';
import setAtherizationToken from './utils/setAuthorizationToken';

toastr.options.timeOut = 1000;
const token = window.localStorage.getItem('token');
setAtherizationToken(token);

const store = configStore();

const history = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
   document.getElementById('app')
);
