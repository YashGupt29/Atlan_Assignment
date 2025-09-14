import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './slices/boardSlice';
import listReducer from './slices/listSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    list: listReducer,
  },
});
