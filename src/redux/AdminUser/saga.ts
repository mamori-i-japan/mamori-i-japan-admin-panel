import { put, takeEvery, all, call, fork, take } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import organizationActionTypes from '../Organization/actionTypes';
import { getAdminUsers, postAdminUser } from '../../apis';
import { getAccessTokenSaga, sendEmailSaga } from '../Firebase/saga';

function* createAdminUserSaga() {
  yield takeEvery(actionTypes.CREATE_ADMIN_USER, function* _({
    payload,
  }: any) {
    const { email } = payload;

    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield call(getAccessTokenSaga);

    try {
      yield call(postAdminUser, { email });

      yield call(sendEmailSaga, email);

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'createAdminUserSuccess' },
      });
    } catch (error) {
      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: {
          errorCode: error.status,
          errorMessage: 'adminUserIsExistError',
        },
      });
    }

    yield put({
      type: loadingActionTypes.END_LOADING,
    });
  });
}

function* getAdminUsersSaga() {
  yield takeEvery(actionTypes.GET_ADMIN_USERS, function* _() {
    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield call(getAccessTokenSaga);

    try {
      const res = yield call(getAdminUsers);

      const data = res.data.map((item: any) => {
        return {
          ...item,
          created: item.created ? item.created._seconds : null
        }
      })

      yield put({
        type: actionTypes.GET_ADMIN_USERS_SUCCESS,
        payload: {
          listData: data,
        },
      });
    } catch (error) {
      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: { errorCode: error.status, errorMessage: error.error },
      });
    }

    yield put({
      type: loadingActionTypes.END_LOADING,
    });
  });
}

function* getOrganizationOptions() {
  yield takeEvery(actionTypes.GET_ORGANIZATION_OPTIONS, function* _() {
    yield put({
      type: actionTypes.CHANGE_ORGANIZATION_LOADING_STATUS,
      payload: { isOrganizationLoading: true },
    });
    yield put({ type: organizationActionTypes.GET_ORGANIZATIONS });
    yield take(loadingActionTypes.END_LOADING);
    yield put({
      type: actionTypes.CHANGE_ORGANIZATION_LOADING_STATUS,
      payload: { isOrganizationLoading: false },
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(createAdminUserSaga),
    fork(getAdminUsersSaga),
    fork(getOrganizationOptions),
  ]);
}
