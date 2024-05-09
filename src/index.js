import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/reducers';
import App from './pages/App';

import { getUsers } from './actions/users.actions';
import './index.css';
// Redux store
const composeEnhancers = compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(getUsers());

// Racine de l'application
const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <App />
  </Provider>
);
