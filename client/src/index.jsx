import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import configStore from './store/configStore';
import routes from './routes.jsx';

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
