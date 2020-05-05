import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { PrefectureMessageStates } from './types';

const initialState: PrefectureMessageStates = {
  listData: [],
};

export default handleActions<PrefectureMessageStates>(
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
      { payload }: { type: string; payload: any }
    ) => {
      const updatedData = state.listData;

      updatedData[parseInt(payload.id, 10) - 1].url = payload.url;

      console.log(payload);

      return {
        ...state,
        listData: updatedData,
      };
    },
  },
  initialState
);
