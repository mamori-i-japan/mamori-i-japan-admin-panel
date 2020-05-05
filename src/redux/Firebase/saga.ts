import { put, call } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { auth, actionCodeSettings } from '../../utils/firebase';
import actionTypes from './actionTypes';
import authActionTypes from '../Auth/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('error'));
      }
    });
  });
};

export function* getAccessTokenSaga() {
  try {
    const user = yield call(onAuthStateChanged);
    const token = yield call([user, user.getIdToken], true);

    localStorage.setItem('token', token);

    const userAdminRole = jwtDecode<{ userAdminRole: string }>(token).userAdminRole;

    yield put({
      type: authActionTypes.SAVE_TOKEN_SUCCESS,
      payload: { token, userAdminRole }
    })
  } catch (error) {
    yield put({
      type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
      payload: { errorCode: error.code, errorMessage: error.message },
    });
  }
}

export function* sendEmailSaga(email: string) {
  try {
    yield call([auth, auth
      .sendSignInLinkToEmail], email, actionCodeSettings)

    yield localStorage.setItem('emailForSignIn', email);

    yield put({
      type: actionTypes.SEND_EMAIL_SUCCESS
    })

  } catch (error) {
    yield put({
      type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
      payload: { errorCode: error.code, errorMessage: error.message },
    });
  }

}
