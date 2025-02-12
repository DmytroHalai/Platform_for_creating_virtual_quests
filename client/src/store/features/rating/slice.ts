import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SLICE_NAME } from "./constants";
import IRating from "../../../types/rating";
import { fetchRatings } from "./thunk";
import State from "../../../types/store";

const initialState: { ratings: IRating[] } & State = {
  ratings: [],
  isLoading: true,
  error: null,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    createQuest: (state, action: PayloadAction<number>) => {
      // name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRatings.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRatings.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});
