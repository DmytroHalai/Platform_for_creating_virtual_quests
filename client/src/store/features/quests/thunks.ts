import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import service from '../../../services/service';
import { normalizeQuests } from './normalizeQuests';

export const fetchQuests = createAsyncThunk<any, any, any>(
  `${SLICE_NAME}/fetchTodos`,
  async <T>(value: T, thunkApi: any) => {
    try {
      const res: any = await service.get('endpoint'); // api endpoint from services/api
      return normalizeQuests(res); 
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
