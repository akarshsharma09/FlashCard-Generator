// tests/flashcardSlice.test.js

import reducer, { addFlashcard, deleteFlashcard } from "../src/redux/flashcardSlice"; // ✅ Corrected path

// ✅ Test adding a flashcard group
test("should add a flashcard", () => {
  const initialState = [];
  const newCard = { groupName: "Math", flashcards: [] };
  const state = reducer(initialState, addFlashcard(newCard));
  expect(state.length).toBe(1);
  expect(state[0]).toEqual(newCard);
});

// ✅ Test deleting a flashcard group by index
test("should delete a flashcard by index", () => {
  const initialState = [
    { groupName: "Math" },
    { groupName: "Science" },
  ];
  const state = reducer(initialState, deleteFlashcard(0));
  expect(state.length).toBe(1);
  expect(state[0].groupName).toBe("Science");
});
