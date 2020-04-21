import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import firebaseActionTypes from '../Firebase/actionTypes';
import { postAdminUser } from '../../apis';

function* createUserSaga() {
  yield takeEvery(actionTypes.CREATE_USER, function* _({
    payload: { email },
  }: any) {
    yield put({
      type: loadingActionTypes.START_LOADING
    })

    try {
      yield put({ type: firebaseActionTypes.GET_ACCESS_TOKEN });

      const res = yield call(postAdminUser, { email });
      console.log(res);

      yield put({
        type: firebaseActionTypes.SEND_EMAIL,
        payload: { email }
      })
    } catch (error) {
      console.log(error)
    }

    yield put({
      type: loadingActionTypes.END_LOADING
    })
  });

}

export default function* rootSaga() {
  yield all([fork(createUserSaga)]);
}
