import { render, screen, fireEvent } from "@testing-library/react";
import CreateFlashcard from "../src/Pages/CreateFlashcard"; // Update path if needed
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

test("shows error when submitting empty form", () => {
  render(
    <Provider store={store}>
      <CreateFlashcard />
    </Provider>
  );

  const createButton = screen.getByText(/Create Flashcard/i);
  fireEvent.click(createButton);

  // 👇 Wait for error message to appear
  expect(
    screen.getByText(/Please fill in all the fields/i)
  ).toBeInTheDocument();
});
