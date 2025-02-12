import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from './constants'
import ICategory from '../../../types/category'

export interface NormalizedState<T> {
  byId: Record<number, T>;
  allIds: number[];
}

const initialState: NormalizedState<ICategory> = {
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