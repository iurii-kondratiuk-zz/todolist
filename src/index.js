import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import reducer from './reducers';
import App from './components/App';

import Login from './containers/Login';

import './index.css';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

const noMatch = () => <div>no such a page</div>

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login} />
      <Route path="app" component={App} />
      <Route path="*" component={noMatch} />
    </Router>
  </Provider>,
  document.getElementById('todo-app')
);
