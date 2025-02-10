import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SLICE_NAME } from './constants'
import ITask from '../../../types/task'

export interface NormalizedState<T> {
  byId: Record<number, T>;
  allIds: number[];
}

const initialState: NormalizedState<ITask> = {
  byId: {},
  allIds: []
}

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    createQuest: (state, action: PayloadAction<number>) => {
    },
  },
})

export const { createQuest } = slice.actions
export default slice.reducer