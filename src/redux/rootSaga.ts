import { all } from 'redux-saga/effects';
import analyticsSaga from './Analytics/saga';
import authSaga from './Auth/saga';
import adminUserSaga from './AdminUser/saga';

export default function* rootSaga() {
  yield all([analyticsSaga(), authSaga(), adminUserSaga()]);
}
