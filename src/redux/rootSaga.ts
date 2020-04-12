import { all } from 'redux-saga/effects';
import analyticsSaga from './Analytics/saga';

export default function* rootSaga() {
  yield all([analyticsSaga()]);
}
