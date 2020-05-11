import { put, takeEvery, all, fork, call } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import loadingActionTypes from '../Loading/actionTypes';
import feedbackActionTypes from '../Feedback/actionTypes';
import { auth } from '../../utils/firebase';
import { login } from '../../apis';
import { sendEmailSaga, getAccessTokenSaga, onAuthStateChanged } from '../Firebase/saga';
import { langCode } from '../../constants';
import { langLocales } from '../../locales';

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
    yield put({ type: loadingActionTypes.START_LOADING });

    const { email } = payload;

    yield call(sendEmailSaga, email);

    yield put({
      type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
      payload: { successMessage: 'loginByAuthLink' },
    });

    yield put({ type: loadingActionTypes.END_LOADING });

    console.log(payload)
    yield payload.callback();
  });
}

function* logoutSaga() {
  yield takeEvery(actionTypes.LOGOUT, function* _({ payload }: any) {
    yield put({ type: loadingActionTypes.START_LOADING });

    try {
      yield call([auth, auth.signOut]);

      localStorage.removeItem('token');
      localStorage.removeItem('userAdminRole');
      localStorage.removeItem('email');

      yield put({
        type: actionTypes.LOGOUT_SUCCESS,
      });

      yield put({
        type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
        payload: { successMessage: 'logoutSuccess' },
      });

      payload.callback();
    } catch (error) {
      yield put({
        type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
        payload: { errorCode: error.code, errorMessage: error.message },
      });
    }

    yield put({ type: loadingActionTypes.END_LOADING });
  });
}

function* autoSignInSaga() {
  yield takeEvery(actionTypes.AUTO_SIGN_IN, function* _({ payload }: any) {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      yield put({ type: loadingActionTypes.START_LOADING });

      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        email = window.prompt(langLocales[langCode]['emailConfirmPrompt']);
      }

      if (email) {
        try {
          yield call(signInWithEmailLink, email);
        } catch (error) {
          yield put({
            type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
            payload: { errorCode: error.code, errorMessage: error.message },
          });
        }
      }

      const user = yield call(onAuthStateChanged);

      if (user) {
        const defaultToken = yield call([user, user.getIdToken]);

        yield put({
          type: actionTypes.SAVE_TOKEN_SUCCESS,
          payload: { token: defaultToken },
        });

        try {
          yield call(login);

          if (auth.currentUser) {
            yield call(getAccessTokenSaga);

            yield put({
              type: feedbackActionTypes.SHOW_SUCCESS_MESSAGE,
              payload: { successMessage: 'loginSuccess' },
            });

            payload.callback();
          }
        } catch (error) {
          yield put({
            type: feedbackActionTypes.SHOW_ERROR_MESSAGE,
            payload: { errorCode: error.status, errorMessage: error.error },
          });
        }
      }
    }
  });
}

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(logoutSaga), fork(autoSignInSaga)]);
}
