import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import { fetchProfile } from './thunks';
import { AuthState } from '../../../types/auth';

const initialState: AuthState = {
  user: null,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        console.log('slice')
      });
  },
});

export const {} = slice.actions;
export default slice.reducer;
