import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import actionTypes from './actionTypes';
import firebaseActionTypes from './../Firebase/actionTypes';
import { auth } from '../../utils/firebase';
import { login } from '../../apis';

const signInWithEmailLink: any = async (email: string) => {
  const { user } = await auth.signInWithEmailLink(email, window.location.href);

  // Clear the URL to remove the sign-in link parameters.
  if (window.history && window.history.replaceState) {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.split('?')[0]
    );
  }

  // Clear email from storage.
  localStorage.removeItem('emailForSignIn');

  return user;
};

function* loginSaga() {
  yield takeEvery(actionTypes.LOGIN, function* _({ payload }: any) {
    let user;
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      user = yield call(signInWithEmailLink, email);

      const defaultToken = yield call([user, user.getIdToken]);

      yield put({
        type: actionTypes.GET_DEFAULT_TOKEN_SUCCESS,
        payload: { token: defaultToken },
      });

      const res = yield call(login);

      if (res.data && auth.currentUser) {
        const accessTokenWithClaims = yield call(
          [user, user.getIdToken],
          true
        );

        localStorage.setItem('token', accessTokenWithClaims);

        yield put({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { token: accessTokenWithClaims, email: res.data.email },
        });

        // const { from }: any = { from: { pathname: '/' } }; // window.location.state || 

        yield put(replace('/'));


      }
    } else {
      const { email } = payload;

      yield put({
        type: firebaseActionTypes.SEND_EMAIL,
        payload: { email },
      });
    }
  });
}

function* logoutSaga() {
  yield takeEvery(actionTypes.LOGOUT, function* _() {
    yield call([auth, auth.signOut]);

    localStorage.removeItem('token');

    yield put({
      type: actionTypes.LOGOUT_SUCCESS,
    });

    yield put(replace('/'));
  });
}

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(logoutSaga)]);
}
