import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';
import service from '../../../services/service';
import { API_USERS_COUNT } from '../../../services/api';

export const fetchUsersCount = createAsyncThunk<any, any, any>( // any (ts)
  `${SLICE_NAME}/fetchUsersCount`,
  async (valuide, thunkApi: any) => {
    try { 
      return await service.get(API_USERS_COUNT); // count.count
    } catch (err: any) {
      if (!err.response) throw err;
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);
