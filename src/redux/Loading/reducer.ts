import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isLoading: true
};

export default handleActions(
  {
    [actionTypes.START_LOADING]: state => ({
      ...state,
      isLoading: true
    }),
    [actionTypes.END_LOADING]: state => ({
      ...state,
      isLoading: false
    })
  },
  initialState
);
