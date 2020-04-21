import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { auth, actionCodeSettings } from '../../firebase';
import { login } from '../../apis';
import { message } from 'antd';

const onAuthStateChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('error'));
      }
    });
  });
};

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
      } else {
        // The client SDK will parse the code from the link for you.
        user = yield call(signInWithEmailLink, email);
      }
    } else {
      const email = payload.email;
      yield auth
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          localStorage.setItem('emailForSignIn', email);
        })
        .catch((error: Error) => console.log(error));
    }
    try {
      user = yield call(onAuthStateChanged);

      const idToken = yield call([user, user.getIdToken]);

      yield put({
        type: actionTypes.GET_DEFAULT_TOKEN_SUCCESS,
        payload: { token: idToken },
      });

      const res = yield call(login, payload);

      if (res.data && auth.currentUser) {
        user = yield auth.currentUser;

        const refreshToken = yield call([user, user.getIdToken], true);

        yield localStorage.setItem('token', refreshToken);

        yield put({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { token: refreshToken, email: res.data.email },
        });
      }
    } catch (error) {
      //TODO: We provide localization, have to show error message on UI layer
      console.log(error);
      message.error('Entered account has error!');
    }
  });
}

function* logoutSaga() {
  yield takeEvery(actionTypes.LOGOUT, function* _() {
    localStorage.removeItem('token');
    yield auth.signOut();

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
    });
  });
}

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(logoutSaga)]);
}
