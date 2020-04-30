import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: []
};

export default handleActions(
  {
    [actionTypes.GET_MESSAGES_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      ...payload
    }),

    [actionTypes.UPDATE_MESSAGE_SUCCESS]: (state, { payload }: any) => {
      const updatedData: any[] = state.listData;

      updatedData[parseInt(payload.id, 10) - 1].url = payload.url;

      return {
        ...state,
        listData: updatedData
      }
    }
  },
  initialState
);

