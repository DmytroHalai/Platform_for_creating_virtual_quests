import { configureStore } from '@reduxjs/toolkit';
import questsReducer from './features/quests/slice';

export const store = configureStore({
  reducer: { quests: questsReducer,  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
