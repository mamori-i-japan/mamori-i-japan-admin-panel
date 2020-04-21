import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import { postPositive } from '../../apis';

function* createPositiveSaga() {
  yield takeEvery(actionTypes.CREATE_POSITIVE, function* _({
    payload: { phone },
  }: any) {
    try {
      yield put({
        type: loadingActionTypes.START_LOADING
      })

      const res = yield call(postPositive, { phoneNumber: '+81' + phone });

      if (res) {
        yield put({
          type: actionTypes.CREATE_POSITIVE_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
    }

    yield put({
      type: loadingActionTypes.END_LOADING
    })
  });
}

export default function* rootSaga() {
  yield all([fork(createPositiveSaga)]);
}
