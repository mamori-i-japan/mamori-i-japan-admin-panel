import { all } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import adminUserSaga from './AdminUser/saga';
import PrefectureMessageSaga from './PrefectureMessage/saga';
import feedbackSaga from './Feedback/saga';
import organizationSaga from './Organization/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    adminUserSaga(),
    PrefectureMessageSaga(),
    feedbackSaga(),
    organizationSaga(),
  ]);
}
