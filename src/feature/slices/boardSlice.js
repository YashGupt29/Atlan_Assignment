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
    deleteBoard: (state, action) => {
      const { boardId } = action.payload;
      state.boards = state.boards.filter((board) => board.id !== boardId);
    },
    updateBoard: (state, action) => {
      const { boardId, title } = action.payload;
      const board = state.boards.find((b) => b.id === boardId);
      if (board) {
        board.title = title;
      }
    },
  },
});

export const { addBoard ,deleteBoard,updateBoard} = boardSlice.actions;

export default boardSlice.reducer;
