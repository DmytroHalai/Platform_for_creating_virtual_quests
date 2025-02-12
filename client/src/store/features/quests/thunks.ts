import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import service from '../../../services/service';
import { API_ENDP_QUESTS, API_ENDP_QUESTS_COUNT } from '../../../services/api';

export const fetchQuests = createAsyncThunk<any, any, any>( // any (ts)
  `${SLICE_NAME}/fetchQuests`,
  async (value, thunkApi: any) => {
    try {
      return await service.get(API_ENDP_QUESTS); // quests.quests
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const fetchQuest = createAsyncThunk<any, any, any>( // any (ts)
  `${SLICE_NAME}/fetchQuest`,
  async (id: number | string, thunkApi: any) => {
    try {
      return await service.get(API_ENDP_QUESTS, `${id}`); // quests.quests
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const fetchQuestsCount = createAsyncThunk<any, any, any>( // any (ts)
  `${SLICE_NAME}/fetchQuestsCount`,
  async (value, thunkApi: any) => {
    try {
      return await service.get(API_ENDP_QUESTS_COUNT);
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
