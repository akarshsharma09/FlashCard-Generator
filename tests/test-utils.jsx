// tests/test-utils.js
import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../src/redux/flashcardSlice";
import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";


export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: { flashcards: flashcardReducer },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
