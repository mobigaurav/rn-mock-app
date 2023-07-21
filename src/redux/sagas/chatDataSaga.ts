import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchChatDataSuccess } from "../ducks/chatData";
import { fetchChatData } from "../../services/userDataServices";

type AnyAction = {type: string, payload: string}

function* workerSaga(action:AnyAction) {
    const { data } = yield call(fetchChatData, action.payload);
    //const  data = "Good Job!"
    console.log("data is", data)
    yield put(fetchChatDataSuccess(data)) 
}

function* watcherSaga() {
    yield takeLatest('chatData/fetchChatData', workerSaga)
}

export default function* ChatDataSaga() {
    yield all([fork(watcherSaga)]);
  }


