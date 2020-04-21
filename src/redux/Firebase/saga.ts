import { put, takeEvery, all, call, fork } from 'redux-saga/effects';
import { auth, actionCodeSettings } from '../../firebase';
import actionTypes from './actionTypes';

function* getAccessTokenSaga() {
  yield takeEvery(actionTypes.GET_ACCESS_TOKEN, function* _() {
    const user = yield auth.currentUser;

    console.log(user);

    const token = yield call([user, user.getIdToken]);

    yield put({
      type: actionTypes.GET_ACCESS_TOKEN_SUCCESS,
      payload: { token }
    })
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
    } catch (error) {
      console.log(error)
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getAccessTokenSaga), fork(sendEmailSaga)]);
}
