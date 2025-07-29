// src/redux/flashcardSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial slice for flashcards
const flashcardSlice = createSlice({
  name: "flashcards",
  initialState: [],
  reducers: {
    // Action to add a flashcard group
    addFlashcard: (state, action) => {
      state.push(action.payload);
    },

    // Action to delete a flashcard group by index
    deleteFlashcard: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

// Exporting actions
export const { addFlashcard, deleteFlashcard } = flashcardSlice.actions;

// Exporting reducer as default
export default flashcardSlice.reducer;
