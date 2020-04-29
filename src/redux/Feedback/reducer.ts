import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { langCode } from '../../constants';
import { langLocales } from '../../locales';

export interface FeedbackState {
  successMessage: string;
  isSuccess: boolean;
  errorMessage: string;
  isError: boolean;
  isDelete: boolean;
}

const initalState: FeedbackState = {
  errorMessage: '',
  isError: false,
  successMessage: '',
  isSuccess: false,
  isDelete: false,
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

    [actionTypes.SHOW_ERROR_ALERT]: (
      state,
      { payload: { errorMessage } }: { type: string; payload: FeedbackState }
    ) => ({
      ...state,
      isError: true,
      errorMessage: langLocales[langCode][errorMessage],
    }),

    [actionTypes.CLOSE_ERROR_ALERT]: (state) => ({
      ...state,
      isError: false,
      errorMessage: '',
    }),

    [actionTypes.SHOW_DELETE_MODAL]: (state) => ({
      ...state,
      isDelete: true,
    }),

    [actionTypes.CLOSE_DELETE_MODAL]: (state) => ({
      ...state,
      isDelete: false,
    }),
  },
  initalState
);
