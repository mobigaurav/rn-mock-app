import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { fetchUsersDataSuccess } from "../ducks/userdata";
import { fetchUserData } from "../../services/userDataServices";



function* workerSaga() {
    const { data } = yield call(fetchUserData);
    //const { formattedUsers } = yield data.json(); 
    //console.log("I got data", data)
    yield put(fetchUsersDataSuccess(data)) 
}

function* watcherSaga() {
    yield takeEvery('usersData/fetchUsersData', workerSaga)
}

export default function* UserDataSaga() {
    yield all([fork(watcherSaga)]);
  }


