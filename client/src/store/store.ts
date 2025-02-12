import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/slice';
import questsReducer from './features/quests/slice';
import usersReducer from './features/users/slice';

export const store = configureStore({
  reducer: { auth: authReducer, quests: questsReducer, users: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
