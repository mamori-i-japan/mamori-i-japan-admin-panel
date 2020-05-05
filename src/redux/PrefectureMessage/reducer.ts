import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { PrefectureMessageStates } from './types';

const initialState: PrefectureMessageStates = {
  listData: [],
};

export default handleActions(
  {
    [actionTypes.GET_MESSAGES_SUCCESS]: (
      state,
      { payload }: { type: string; payload: PrefectureMessageStates }
    ) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.UPDATE_MESSAGE_SUCCESS]: (
      state,
      { payload }: { type: string; payload: PrefectureMessageStates }
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
