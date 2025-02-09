import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { JSX} from 'react';

interface Quest {
  id: string
  title: string
  time: string
  category: string
  description: string
  image: string
  tasks: Array<{
    id: number
    image: string | null
    type: string
    description: string
  }>
  answers: Array<{
    id: number
    text: string
    isCorrect: boolean
  }>
}

interface QuestState {
  quests: Quest[]
  loading: boolean
  error: string | null
}

const initialState: QuestState = {
  quests: [],
  loading: false,
  error: null,
}

export const createQuest = createAsyncThunk("quests/createQuest", async (questData: Omit<Quest, "id">) => {
  try {
    /// Here you would make your API call
    // const response = await api.post('/quests', questData);
    // return response.data;

    // For now, we'll mock the response
    return {
      ...questData,
      id: Date.now().toString(),
    }
  } catch (error) {
    throw new Error("Failed to create quest")
  }
})

const questSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuest.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createQuest.fulfilled, (state, action: PayloadAction<Quest>) => {
        state.quests.push(action.payload)
        state.loading = false
      })
      .addCase(createQuest.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to create quest"
      })
  },
})

export default questSlice.reducer

