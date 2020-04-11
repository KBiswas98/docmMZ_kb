import { combineReducers } from "redux"; 

import AuthReducer from '../reducer/auth'
import DataStoreReducer from '../reducer/dataStore'
import ScheduleReducer from './schedule'
import DoctorReducer from './doctorReducer'

const allReducer = combineReducers({
  AuthReducer,
  DataStoreReducer,
  ScheduleReducer,
  DoctorReducer
});

export default allReducer;