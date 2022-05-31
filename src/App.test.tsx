import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a form with postcode input", () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/postcode/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "text");

  const submitElement = screen.getByText(/check postcode/i);
  expect(submitElement).toBeInTheDocument();
  expect(submitElement).toHaveAttribute("type", "submit");
});
