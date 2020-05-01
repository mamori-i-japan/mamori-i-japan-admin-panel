import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { MessageState } from "./types";

const initialState: MessageState = {
  listData: [],
};

export default handleActions<MessageState>(
  {
    [actionTypes.GET_MESSAGES_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      ...payload
    }),

    [actionTypes.UPDATE_MESSAGE_SUCCESS]: (state, { payload }: any) => {
      const updatedData = state.listData;

      updatedData[parseInt(payload.id, 10) - 1].url = payload.url;

      return {
        ...state,
        listData: updatedData
      }
    }
  },
  initialState
);

