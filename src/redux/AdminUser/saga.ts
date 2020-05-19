import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import { getAdminUsers, postAdminUser, deleteAdminUser } from '../../apis';
import { getAccessTokenSaga, sendEmailSaga } from '../Firebase/saga';
import { adminRoleList } from '../../constants/AdminRole';
import { prefectureList } from '../../constants/Prefecture';

function* createAdminUserSaga() {
  yield takeEvery(actionTypes.CREATE_ADMIN_USER, function* _({ payload }: any) {
    const { email, role: adminRole, organization, prefecture } = payload.data;

    yield put({
      type: loadingActionTypes.START_LOADING,
    });

    yield call(getAccessTokenSaga);

    const requestBody: any = {
      email,
      adminRole: adminRoleList[adminRole],
    };

    if (organization) {
      requestBody.organizationId = organization;
    }

    if (prefecture) {
      requestBody.prefectureId = Number.parseInt(prefectureList[prefecture].id);
    }

    try {
      yield call(postAdminUser, requestBody);

      yield call(sendEmailSaga, email);

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'createAdminUserSuccess' },
      });

      payload.callback();
    } catch (error) {
      const errorMessage = error.status === 409 ? 'adminUserIsExistError' : error.error;

      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: {
          errorCode: error.status,
          errorMessage: errorMessage
        }
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
          createdAt: item.createdAt ? item.createdAt._seconds : null
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

function* deleteAdminUserSaga() {
  yield takeEvery(actionTypes.DELETE_ADMIN_USER, function* _({
    payload,
  }: {
    type: string;
    payload: { id: string };
  }) {
    yield put({ type: loadingActionTypes.START_LOADING });

    yield call(getAccessTokenSaga);

    try {
      yield call(deleteAdminUser, payload);

      yield put({ type: actionTypes.DELETE_ADMIN_USER_SUCCESS });

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'deleteSuccess' },
      });

      yield put({
        type: actionTypes.GET_ADMIN_USERS,
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
  yield all([
    fork(createAdminUserSaga),
    fork(getAdminUsersSaga),
    fork(deleteAdminUserSaga),
  ]);
}
