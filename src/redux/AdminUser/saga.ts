import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { auth, actionCodeSettings } from '../../firebase';

function* loginSaga() {
  yield takeEvery(actionTypes.CREATE_USER, function* _({ payload: { email } }: any) {
    yield auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        localStorage.setItem('emailForSignIn', email);
      }).catch((error: Error) => console.log(error));
  })
}

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
