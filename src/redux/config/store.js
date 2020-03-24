import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducer from "../reducer";
import MainNavigation from '../../config/routes/MainNavigation';

export default function Store() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const saveToLocalStore = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadStateFromStore = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
const storedData = loadStateFromStore();

const store = createStore(
  allReducer,
  storedData,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStore(store.getState()));
