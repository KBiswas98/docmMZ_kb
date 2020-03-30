import { combineReducers } from "redux"; 

import AuthReducer from '../reducer/auth'
import DataStoreReducer from '../reducer/dataStore'

const allReducer = combineReducers({
  AuthReducer,
  DataStoreReducer
});

export default allReducer;