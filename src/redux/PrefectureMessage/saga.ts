import { put, takeEvery, all, fork, call, select } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import { getPrefectures, patchPrefecture } from '../../apis';

function* updateMessageSaga() {
  yield takeEvery(actionTypes.UPDATE_MESSAGE, function* _({ payload }: any) {
    const { url, id } = payload;

    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      yield call(patchPrefecture, { id, message: url });

      const { listData } = yield select((state) => state.prefectureMessage)

      listData[parseInt(payload.id, 10)].url = payload.url;

      yield put({
        type: actionTypes.UPDATE_MESSAGE_SUCCESS,
        payload: { listData },
      });

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'submitSuccess' },
      });
    } catch (error) {
      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: { errorCode: error.status, errorMessage: error.error },
      });
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

function* getMessagesSaga() {
  yield takeEvery(actionTypes.GET_MESSAGES, function* _() {
    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      const res = yield call(getPrefectures);

      const data = res.data.map((item: any) => {
        return ({
          ...item,
          url: item.message,
          id: item.prefectureId
        })
      })

      yield put({
        type: actionTypes.GET_MESSAGES_SUCCESS,
        payload: {
          listData: data
        },
      });
    } catch (error) {
      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: { errorCode: error.status, errorMessage: error.error },
      });
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

export default function* rootSaga() {
  yield all([fork(updateMessageSaga), fork(getMessagesSaga)]);
}
