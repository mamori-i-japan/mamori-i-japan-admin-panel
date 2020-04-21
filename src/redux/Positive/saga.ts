import { put, call, takeEvery, all, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { postPositive } from '../../apis';

function* createPositiveSaga() {
  yield takeEvery(actionTypes.CREATE_POSITIVE, function* _({
    payload: { phone },
  }: any) {
    try {
      const res = yield call(postPositive, { phoneNumber: phone });

      if (res) {
        yield put({
          type: actionTypes.CREATE_POSITIVE_SUCCESS,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(createPositiveSaga)]);
}
