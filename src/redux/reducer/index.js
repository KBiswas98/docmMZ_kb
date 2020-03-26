import { combineReducers } from "redux"; 

import AuthReducer from '../reducer/auth'

const allReducer = combineReducers({
  AuthReducer
});

export default allReducer;