import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import service from '../../../services/service';
import { API_RATINGS } from '../../../services/api';

export const fetchRatings = createAsyncThunk<any, any, any>( // any (ts)
  `${SLICE_NAME}/fetchUsersCount`,
  async (value, thunkApi: any) => {
    try { 
      return await service.get(API_RATINGS);
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
