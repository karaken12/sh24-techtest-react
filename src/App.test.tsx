import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

import { isPostcodeShippable } from "./isPostcodeShippable";
jest.mock("./isPostcodeShippable");
const mockIsPostcodeShippable = isPostcodeShippable as jest.MockedFunction<
  typeof isPostcodeShippable
>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const testPostcodeShippable = async (postcode: string): Promise<boolean> => {
  await sleep(500);
  return postcode == "abc123";
};

beforeEach(() => {
  mockIsPostcodeShippable.mockImplementation(testPostcodeShippable);
  render(<App />);
});

test("renders a form with postcode input", () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "text");

  const submitElement = screen.getByText(/check postcode/i);
  expect(submitElement).toBeInTheDocument();
  expect(submitElement).toHaveAttribute("type", "submit");
});

test("submitting the form keeps the value in the input", () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "def789");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(screen.getByLabelText(/postcode/i)).toHaveValue("def789");
});

test("inputting a valid postcode gives a positive result", async () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "abc123");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode abc123 is shippable/)
  ).toBeInTheDocument();
});

test("inputting an invalid postcode gives a negative result", async () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "abc456");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode abc456 is not shippable/)
  ).toBeInTheDocument();
});
