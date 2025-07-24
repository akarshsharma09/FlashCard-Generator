import { createSlice } from '@reduxjs/toolkit';

const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState: [],
  reducers: {
    addFlashcard: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addFlashcard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
