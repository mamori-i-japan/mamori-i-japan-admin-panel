import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import { getMessages, postMessaage } from '../../apis';

function* editMessageSaga() {
  yield takeEvery(actionTypes.EDIT_MESSAGES, function* _({ }) {
    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      const res = yield call(postMessaage, { id: '33', url: '44' });

      yield put({
        type: actionTypes.EDIT_MESSAGES_SUCCESS,
      });
    } catch (error) {
      console.log(error);
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

function* getMessagesSaga() {
  yield takeEvery(actionTypes.GET_MESSAGES, function* _({ }) {
    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      const res = yield call(getMessages);
      const data = res.map((item: any) => ({
        ...item,
        key: item.id
      }))

      yield put({
        type: actionTypes.GET_MESSAGES_SUCCESS,
        payload: {
          listData: data,
        },
      });
    } catch (error) {
      console.log(error);
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

export default function* rootSaga() {
  yield all([fork(editMessageSaga), fork(getMessagesSaga)]);
}
