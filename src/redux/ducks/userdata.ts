import { createSlice, nanoid, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

type UserDataState = 'init' | 'loading' | 'denied' | 'successful'

type userDataState = {
    users : any[],
    error: string | null,
    userDataState: UserDataState
}

const initialState:userDataState = {
  users: [],
  error:null,
  userDataState: 'init'
};

const userDataSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    fetchUsersData: (state,action) => {
          state.userDataState = 'loading'
    },
    fetchUsersDataSuccess: (state,action) => {
        console.log("lets change the status and assign value of users", action.payload)
        state.users = action.payload
        state.userDataState = 'successful'
    },
    fetchUsersDataFailure: (state, action) => {
        state.error = action.payload
        state.userDataState = 'denied'
        state.users = []
    }
  }
});



export const { fetchUsersData, fetchUsersDataSuccess, fetchUsersDataFailure } = userDataSlice.actions;


export default userDataSlice.reducer;

export const selectAllUsers = (state: RootState) => state.userData.users
export const selectStatus = (state: RootState) => state.userData.userDataState
