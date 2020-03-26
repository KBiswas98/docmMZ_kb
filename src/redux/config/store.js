import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducer from '../reducer';
import MainNavigation from '../../config/routes/MainNavigation';
import {AsyncStorage} from 'react-native';

const saveToLocalStore = async state => {
  console.log('***********');
  console.log(state);
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

const _getData = async () => {
  await AsyncStorage.getItem('state');
};

const loadStateFromStore = () => {
  try {
    const serializedState = _getData();
    console.log('-----------------');
    if (serializedState !== null) {
      console.log(JSON.parse(serializedState));
      // if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
const storedData = loadStateFromStore();

const store = createStore(
  allReducer,
  storedData,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStore(store.getState()));

export default function Store() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
