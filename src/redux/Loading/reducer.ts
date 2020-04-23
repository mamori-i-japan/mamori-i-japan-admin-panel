import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isLoading: false
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
