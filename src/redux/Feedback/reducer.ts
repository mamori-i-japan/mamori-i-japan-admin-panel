import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { langCode } from '../../constants';
import { langLocales } from '../../locales';

export interface FeedbackState {
  successMessage: string;
  isSuccess: boolean;
  errorMessage: string;
  isError: boolean;
}

const initalState: FeedbackState = {
  errorMessage: 'error',
  isError: true,
  successMessage: 'success',
  isSuccess: true,
};

export default handleActions(
  {
    [actionTypes.SHOW_SUCCESS_MESSAGE]: (
      state,
      { payload: { successMessage } }: { type: string; payload: FeedbackState }
    ) => ({
      ...state,
      isSuccess: true,
      successMessage: langLocales[langCode][successMessage],
    }),

    [actionTypes.CLOSE_SUCCESS_MESSAGE]: (state) => ({
      ...state,
      isSuccess: false,
      successMessage: '',
    }),

    [actionTypes.SHOW_ERROR_MESSAGE]: (
      state,
      { payload: { errorMessage } }: { type: string; payload: FeedbackState }
    ) => ({
      ...state,
      isError: true,
      errorMessage: langLocales[langCode][errorMessage],
    }),

    [actionTypes.CLOSE_ERROR_MESSAGE]: (state) => ({
      ...state,
      isError: false,
      errorMessage: '',
    }),
  },
  initalState
);