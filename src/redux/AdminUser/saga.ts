import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import firebaseActionTypes from '../Firebase/actionTypes';
import { getAdminUsers, postAdminUser } from '../../apis';

function* createUserSaga() {
  yield takeEvery(actionTypes.CREATE_ADMIN_USER, function* _({
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
  yield takeEvery(actionTypes.GET_ADMIN_USERS, function* _() {
    //TODO: add pagination & query params if API supports
    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield put({ type: firebaseActionTypes.GET_ACCESS_TOKEN });

    try {
      const res = yield call(getAdminUsers);

      // TODO: fix the types of any by auto generate
      const data = res.data.map((item: any) => ({
        ...item,
        key: item.adminUserId
      }))
      yield put({
        type: actionTypes.GET_ADMIN_USERS_SUCCESS, payload: {
          listData: data
        }
      });
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
