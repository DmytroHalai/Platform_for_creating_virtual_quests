import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from './constants'
import IAnswer from '../../../types/answer'

export interface NormalizedState<T> {
  byId: Record<number, T>;
  allIds: number[];
}

const initialState: NormalizedState<IAnswer> = {
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
})

export const { createQuest } = slice.actions
export default slice.reducer