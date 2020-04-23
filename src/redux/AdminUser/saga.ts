import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import firebaseActionTypes from '../Firebase/actionTypes';
import { getAdminUsers, postAdminUser } from '../../apis';

function* createUserSaga() {
  yield takeEvery(actionTypes.CREATE_USER, function* _({
    payload: { email },
  }: any) {
    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield put({ type: firebaseActionTypes.GET_ACCESS_TOKEN });

    try {
      yield call(postAdminUser, { email });
      yield put({
        type: firebaseActionTypes.SEND_EMAIL,
        payload: { email },
      });
    } catch (error) {
      console.log(error);
    }

    yield put({
      type: loadingActionTypes.END_LOADING,
    });
  });
}

function* getUsersSaga() {
  yield takeEvery(actionTypes.GET_USERS, function* _() {
    //TODO: add pagination & query params if API supports
    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield put({ type: firebaseActionTypes.GET_ACCESS_TOKEN });

    try {
      yield call(getAdminUsers);
      yield put({ type: actionTypes.GET_USERS_SUCCESS });
    } catch (error) {
      console.log(error);
    }

    yield put({
      type: loadingActionTypes.END_LOADING,
    });
  });
}

export default function* rootSaga() {
  yield all([fork(createUserSaga), fork(getUsersSaga)]);
}
