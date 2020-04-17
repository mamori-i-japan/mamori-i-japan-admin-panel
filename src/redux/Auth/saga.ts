import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { auth } from '../../firebase';
import { login } from '../../apis';

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

function* loginSaga() {
  yield takeEvery(actionTypes.LOGIN, function* _({ payload }: any) {
    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
      const user = yield call(onAuthStateChanged);

      if (user) {
        const idToken = yield call([user, user.getIdToken]);

        yield put({ type: actionTypes.LOGIN_SUCCESS, payload: { token: idToken } });

        const res = yield call(login, payload);

        // console.log(res);
      }
    }

    // let localStorageEmail = localStorage.getItem('emailForSignIn');

    // if (!localStorageEmail) {
    //   // User opened the link on a different device. To prevent session fixation
    //   // attacks, ask the user to provide the associated email again. For example:
    //   localStorageEmail = window.prompt('Please provide your email for confirmation');
    // }

    // // The client SDK will parse the code from the link for you.
    // yield auth.signInWithEmailLink(email, window.location.href)
    //   .then(function (result) {
    //     // Clear email from storage.
    //     window.localStorage.removeItem('emailForSignIn');

    //   })
    //   .catch(function (error) {
    //     // Some error occurred, you can inspect the code: error.code
    //     // Common errors could be invalid email and invalid or expired OTPs.
    //   });
  });
}

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
