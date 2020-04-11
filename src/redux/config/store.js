import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger'
import allReducer from '../reducer';
import MainNavigation from '../../config/routes/MainNavigation';

const store = createStore(allReducer, applyMiddleware(thunk, logger));

export default function Store() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
