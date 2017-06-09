import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configStore from './store/configStore';
import routes from './routes.jsx';
import './styles/styles.scss';
import '../../node_modules/sweetalert/dist/sweetalert.css';
import toastr from 'toastr';
import setAtherizationToken from './utils/setAuthorizationToken';

toastr.options.timeOut = 20;
const token = localStorage.getItem('token');
setAtherizationToken(token);

const store = configStore();

const history = createBrowserHistory();
console.log('in index');

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
   document.getElementById('app')
);
