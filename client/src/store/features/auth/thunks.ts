import { createAsyncThunk } from '@reduxjs/toolkit';
import service from '../../../services/service';
import { API_ENDP_PROFILE } from '../../../services/api';
import { SLICE_NAME } from './constants';
import IUser from '../../../types/user';

export const fetchProfile = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string | Error }
>( // any any
  `${SLICE_NAME}/fetchProfile`,
  async () => {
    try {
      return await service.get(API_ENDP_PROFILE);
    } catch (err) {
      console.log(err);
    }
  },
);
