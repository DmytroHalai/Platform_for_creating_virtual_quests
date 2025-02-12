import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import IUser from '../../../types/user';
import State from '../../../types/store';
import { fetchUsersCount } from './thunk';

const initialState: State & { users: IUser[]; count: number } = {
  users: [],
  count: 0,
  isLoading: true,
  error: null,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      // thunks
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUsersCount.fulfilled,
        (state, action: PayloadAction<any>) => {
          // IUser[]
          state.count = action.payload.count; // quests
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(
        fetchUsersCount.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload || 'Something went wrong';
        },
      );
  },
});

export const {setUsers} = slice.actions;
export default slice.reducer;
