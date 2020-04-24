import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import { auth, actionCodeSettings } from '../../utils/firebase';
import actionTypes from './actionTypes';
import { message } from 'antd';

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

function* getAccessTokenSaga() {
  yield takeEvery(actionTypes.GET_ACCESS_TOKEN, function* _() {
    try {
      const user = yield call(onAuthStateChanged);
      const token = yield call([user, user.getIdToken], true);

      console.log(token);

      localStorage.setItem('token', token);

      yield put({
        type: actionTypes.GET_ACCESS_TOKEN_SUCCESS,
        payload: { token }
      })
    } catch (error) {
      console.log(error);
    }
  });
}

function* sendEmailSaga() {
  yield takeEvery(actionTypes.SEND_EMAIL, function* _({
    payload: { email },
  }: any) {
    try {
      yield call([auth, auth
        .sendSignInLinkToEmail], email, actionCodeSettings)

      yield localStorage.setItem('emailForSignIn', email);

      yield put({
        type: actionTypes.SEND_EMAIL_SUCCESS
      })

      message.success('Please check email and login by auth link');
    } catch (error) {
      console.log(error)
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getAccessTokenSaga), fork(sendEmailSaga)]);
}
