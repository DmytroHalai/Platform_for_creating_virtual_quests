import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from './constants'
import IRating from '../../../types/rating'

export interface NormalizedState<T> {
  byId: Record<number, T>;
  allIds: number[];
}

const initialState: NormalizedState<IRating> = {
  byId: {},
  allIds: []
}

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    createQuest: (state, action: PayloadAction<number>) => { // name
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuests.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchQuests.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })
  }
})

export const { createQuest } = slice.actions
export default slice.reducer