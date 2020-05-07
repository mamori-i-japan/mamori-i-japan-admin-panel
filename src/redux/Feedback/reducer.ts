import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { langCode } from '../../constants';
import { langLocales } from '../../locales';
import { FeedbackStates } from './types';


const initalState: FeedbackStates = {
  errorMessage: '',
  errorCode: null,
  isError: false,
  successMessage: '',
  isSuccess: false,
};

export default handleActions(
  {
    [actionTypes.SHOW_SUCCESS_MESSAGE]: (
      state,
      { payload: { successMessage } }: { type: string; payload: FeedbackStates }
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
      {
        payload: { errorCode, errorMessage },
      }: { type: string; payload: FeedbackStates }
    ) => {
      const message = langLocales[langCode][errorMessage];

      return {
        ...state,
        isError: true,
        errorCode,
        errorMessage: `${errorCode}, ${message ? langLocales[langCode][errorMessage] : errorMessage}`,
      }
    },

    [actionTypes.CLOSE_ERROR_MESSAGE]: (state) => ({
      ...state,
      isError: false,
      errorMessage: '',
    }),
  },
  initalState
);
