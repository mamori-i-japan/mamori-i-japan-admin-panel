import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import rootSaga from './rootSaga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    store: {};
  }
}

const windowIfDefined = typeof window === 'undefined' ? null : window;
const composeEnhancers =
  (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routeMiddleware, sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

window.store = store;

export { store, history };
