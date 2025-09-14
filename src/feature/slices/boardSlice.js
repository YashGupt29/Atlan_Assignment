import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
  },
});

export const { addBoard } = boardSlice.actions;

export default boardSlice.reducer;
