import { put, takeEvery, all, fork, delay } from 'redux-saga/effects';
import actionTypes from './actionTypes';

function* showSuccessMessageSaga() {
  yield takeEvery(actionTypes.SHOW_SUCCESS_MESSAGE, function* _() {
    yield delay(3000);
    yield put({ type: actionTypes.CLOSE_SUCCESS_MESSAGE });
  });
}

function* showErrorMessageSaga() {
  yield takeEvery(actionTypes.SHOW_ERROR_MESSAGE, function* _() {
    yield delay(3000);
    yield put({ type: actionTypes.CLOSE_ERROR_MESSAGE });
  });
}

export default function* rootSaga() {
  yield all([fork(showSuccessMessageSaga), fork(showErrorMessageSaga)]);
}
