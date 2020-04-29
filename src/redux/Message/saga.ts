import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import { getMessages, postMessaage } from '../../apis';

function* editMessageSaga() {
  yield takeEvery(actionTypes.UPDATE_MESSAGES, function* _({ payload }: any) {
    const { url, id } = payload;

    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      yield call(postMessaage, { id, url });

      yield put({
        type: actionTypes.UPDATE_MESSAGES_SUCCESS,
        payload,
      });

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'submitted' },
      });
    } catch (error) {
      console.log(error);
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

function* getMessagesSaga() {
  yield takeEvery(actionTypes.GET_MESSAGES, function* _() {
    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      const res = yield call(getMessages);
      const data = res.map((item: any) => ({
        ...item,
        key: item.id,
      }));

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
