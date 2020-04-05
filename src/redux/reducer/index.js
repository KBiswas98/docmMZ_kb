import { combineReducers } from "redux"; 

import AuthReducer from '../reducer/auth'
import DataStoreReducer from '../reducer/dataStore'
import ScheduleReducer from './schedule'

const allReducer = combineReducers({
  AuthReducer,
  DataStoreReducer,
  ScheduleReducer
});

export default allReducer;