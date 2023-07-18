import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./ducks/counter";
import userReducer from "./ducks/user";
import appStateReducer from './ducks/appState'
import userDataReducer from "./ducks/userdata"
import chatDataReducer from "./ducks/chatData";

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
  counter: counterReducer,
  userData:userDataReducer,
  chatData:chatDataReducer
});

export default rootReducer;
