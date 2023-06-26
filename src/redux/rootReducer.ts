import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./ducks/counter";
import userReducer from "./ducks/user";
import appStateReducer from './ducks/appState'

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
  counter: counterReducer,
});

export default rootReducer;
