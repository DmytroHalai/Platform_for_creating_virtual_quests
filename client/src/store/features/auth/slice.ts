import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';

export interface AuthState {
  userId: number | null;
  token: string | null; //
}

const initialState: AuthState = {
  userId: null,
  token: null,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // state.value += action.payload
    },
  },
});

export const { incrementByAmount } = slice.actions;
export default slice.reducer;
