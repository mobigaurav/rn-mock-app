import { all, fork, spawn } from "redux-saga/effects";
import UserDataSaga from "./userDataSaga";
import ChatDataSaga from "./chatDataSaga";

export default function* rootSaga() {
  yield spawn(UserDataSaga)
  yield spawn(ChatDataSaga)
  //yield all([fork(UserDataSaga), fork(ChatDataSaga)]);
}