import { put, takeEvery, all, fork, call, select } from 'redux-saga/effects';
import { find } from 'lodash';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import {
  getOrganizations,
  postOrganization,
  patchOrganization,
  deleteOrganization,
} from '../../apis';
import { getAccessTokenSaga } from '../Firebase/saga';

function* createOrganizationSaga() {
  yield takeEvery(actionTypes.CREATE_ORGANIZATION, function* _({
    payload,
  }: any) {
    yield put({ type: loadingActionTypes.START_LOADING });

    yield call(getAccessTokenSaga);

    try {
      yield call(postOrganization, payload);

      yield put({
        type: actionTypes.CREATE_ORGANIZATION_SUCCESS,
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

function* getOrganizationsSaga() {
  yield takeEvery(actionTypes.GET_ORGANIZATIONS, function* _() {
    yield put({ type: loadingActionTypes.START_LOADING });

    yield call(getAccessTokenSaga);

    try {
      const res = yield call(getOrganizations);

      yield put({
        type: actionTypes.GET_ORGANIZATIONS_SUCCESS,
        payload: { listData: res.data },
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

function* updateOrganizationSaga() {
  yield takeEvery(actionTypes.UPDATE_ORGANIZATION, function* _({
    payload,
  }: any) {
    yield put({ type: loadingActionTypes.START_LOADING });

    yield call(getAccessTokenSaga);

    try {
      yield call(patchOrganization, payload);

      yield put({ type: actionTypes.UPDATE_ORGANIZATION_SUCCESS });

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

function* deleteOrganizationSaga() {
  yield takeEvery(actionTypes.DELETE_ORGANIZATION, function* _({
    payload,
  }: any) {
    yield put({ type: loadingActionTypes.START_LOADING });

    yield call(getAccessTokenSaga);

    try {
      yield call(deleteOrganization, payload);

      yield put({
        type: actionTypes.DELETE_ORGANIZATION_SUCCESS,
      });

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'deleteSuccess' },
      });

      yield put({
        type: actionTypes.GET_ORGANIZATIONS,
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

function* setSelectedOrganizationSaga() {
  yield takeEvery(actionTypes.SET_SELECTED_ORGANIZATION, function* _({
    payload,
  }: any) {
    const { listData } = yield select((state) => state.organization);
    const detailData = find(listData, { id: payload });
    console.log(payload);
    console.log(detailData)

    yield put({
      type: actionTypes.SET_SELECTED_ORGANIZATION_SUCCESS,
      payload: { detailData },
    });
  });
}

export default function* rootSaga() {
  yield all([
    fork(createOrganizationSaga),
    fork(getOrganizationsSaga),
    fork(updateOrganizationSaga),
    fork(deleteOrganizationSaga),
    fork(setSelectedOrganizationSaga),
  ]);
}
