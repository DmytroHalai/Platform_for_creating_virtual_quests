import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import IQuest from '../../../types/quest';
import { fetchQuest, fetchQuests, fetchQuestsCount } from './thunks';
import State from '../../../types/store';

const initialState: { quests: IQuest[]; count: number } & State = {
  quests: [],
  count: 0,
  isLoading: true,
  error: null,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    createQuest: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuests.fulfilled, (state, action: PayloadAction<any>) => {
        // IQuest[]
        state.quests = action.payload.quests; // quests
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchQuests.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchQuest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuest.fulfilled, (state, action: PayloadAction<any>) => {
        // IQuest[]
        const index = state.quests.findIndex(
          (item) => item.quest_id === action.payload.quest_id,
        );
        if (index === -1) {
          // review
          state.quests.push(action.payload.quest);
        } else {
          state.quests[index] = { ...action.payload.quest };
        }
        state.quests = action.payload.quests; // quests
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchQuest.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchQuestsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchQuestsCount.fulfilled,
        (state, action: PayloadAction<any>) => {
          //any (number)
          state.count = action.payload.questsCount; //questsCount
          state.isLoading = false;
          state.error = null;
        },
      )
      .addCase(
        fetchQuestsCount.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload || 'Something went wrong';
        },
      );
  },
});

export const { createQuest } = slice.actions;
export default slice.reducer;
