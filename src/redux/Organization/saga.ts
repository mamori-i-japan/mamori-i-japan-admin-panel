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
  getOrganization,
} from '../../apis';
import { getAccessTokenSaga } from '../Firebase/saga';
import {
  UpdateOrganizationRequestDto,
  CreateOrganizationRequestDto,
} from '../../apis/types';
import { Organization } from './types';

function* createOrganizationSaga() {
  yield takeEvery(actionTypes.CREATE_ORGANIZATION, function* _({
    payload,
  }: {
    type: string;
    payload: CreateOrganizationRequestDto;
  }) {
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

      const data = res.data.map((item: Organization) => {
        return {
          ...item,
          id: item.organizationId, // adjust API change
          created: item.createdAt ? item.createdAt._seconds : null,
        };
      });

      yield put({
        type: actionTypes.GET_ORGANIZATIONS_SUCCESS,
        payload: { listData: data },
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
  }: {
    type: string;
    payload: UpdateOrganizationRequestDto;
  }) {
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
  }: {
    type: string;
    payload: { id: string };
  }) {
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

function* getOrganizationSaga() {
  yield takeEvery(actionTypes.GET_ORGANIZATION, function* _({
    payload,
  }: {
    type: string;
    payload: { id: string };
  }) {
    const { listData } = yield select((state) => state.organization);
    let detailData;

    if (listData.length) {
      detailData = find(listData, { id: payload.id });

      yield put({
        type: actionTypes.GET_ORGANIZATION_SUCCESS,
        payload: { detailData },
      });
    } else {
      yield call(getAccessTokenSaga);

      try {
        const res = yield call(getOrganization, payload);

        detailData = res.data;

        yield put({
          type: actionTypes.GET_ORGANIZATION_SUCCESS,
          payload: { detailData },
        });
      } catch (error) {
        yield put({
          type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
          payload: { errorCode: error.status, errorMessage: error.error },
        });
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(createOrganizationSaga),
    fork(getOrganizationsSaga),
    fork(updateOrganizationSaga),
    fork(deleteOrganizationSaga),
    fork(getOrganizationSaga),
  ]);
}
