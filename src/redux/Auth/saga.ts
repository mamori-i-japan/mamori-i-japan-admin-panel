import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import { auth, actionCodeSettings } from '../../firebase';
import { login } from '../../apis';

function* loginSaga() {
  yield takeEvery(actionTypes.LOGIN, function* _({ payload: { email } }: any) {
    // auth.sendSignInLinkToEmail(email, actionCodeSettings)
    //   .then(() => {
    //     localStorage.setItem('emailForSignIn', email);
    //   }).catch((error: Error) => console.log(error));


    // const res = yield call(login, payload)

    // Confirm the link is a sign-in with email link.
    if (auth.isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let localStorageEmail = localStorage.getItem('emailForSignIn');
      if (!localStorageEmail) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        localStorageEmail = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      auth.signInWithEmailLink(email, window.location.href)
        .then(function (result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          console.log(result);
        })
        .catch(function (error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }

    yield put({ type: actionTypes.LOGIN_SUCCESS, payload: { token: '4444' } })
  })
}

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
