import { put, takeEvery, all, fork } from 'redux-saga/effects';
import { auth, actionCodeSettings } from '../../firebase';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';

function* createUserSaga() {
  yield takeEvery(actionTypes.CREATE_USER, function* _({
    payload: { email },
  }: any) {
    yield put({
      type: loadingActionTypes.START_LOADING
    })
    //TODO: create admin user to firebase

    yield auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        localStorage.setItem('emailForSignIn', email);
      })
      .catch((error: Error) => console.log(error));

    yield put({
      type: loadingActionTypes.END_LOADING
    })
  });

}

export default function* rootSaga() {
  yield all([fork(createUserSaga)]);
}
