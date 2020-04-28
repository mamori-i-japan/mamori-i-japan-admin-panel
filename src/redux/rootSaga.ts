import { all } from 'redux-saga/effects';
import analyticsSaga from './Analytics/saga';
import authSaga from './Auth/saga';
import adminUserSaga from './AdminUser/saga';
import firebaseSaga from './Firebase/saga';
import messageSaga from './Message/saga';

export default function* rootSaga() {
  yield all([
    analyticsSaga(),
    authSaga(),
    firebaseSaga(),
    adminUserSaga(),
    messageSaga(),
  ]);
}
