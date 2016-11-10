import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import App from './components/App';

import './index.scss';

const store = createStore(
	reducer,
	applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('todo-app')
);
