import { createSlice, nanoid, createAsyncThunk, createAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from '../index';

type ChatDataState = 'init' |'loading' | 'denied' | 'successful'

type chatDataState = {
    chatResponse : string,
    error: string | null,
    chatDataState: ChatDataState
}

const initialState:chatDataState = {
  chatResponse: '',
  error:null,
  chatDataState: 'init'
};

const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    fetchChatData: (state,action) => {
          state.chatDataState = 'loading'
    },
    fetchChatDataSuccess: (state,action) => {
        //console.log("lets change the status and assign value of users", action.payload)
          state.chatResponse = action.payload
          state.chatDataState = 'successful'
    },
    fetchChatDataFailure: (state, action) => {
        state.error = action.payload
        state.chatDataState = 'denied'
    }
  }
});



export const { fetchChatData, fetchChatDataSuccess, fetchChatDataFailure } = chatDataSlice.actions;


export default chatDataSlice.reducer;

export const getChatReponse = (state: RootState) => state.chatData.chatResponse;
export const selectStatus = (state: RootState) => state.chatData.chatDataState;
export const selectChatReponse = createSelector(
  (state:RootState) => state.chatData.chatResponse,
  (chatResponse) => chatResponse
);

