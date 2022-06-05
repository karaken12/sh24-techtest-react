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
  return postcode == "SE1 7QD";
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
  userEvent.type(inputElement, "SE1 7QD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(screen.getByLabelText(/postcode/i)).toHaveValue("SE1 7QD");
});

test("inputting a valid postcode gives a positive result", async () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "SE1 7QD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode SE1 7QD is shippable/)
  ).toBeInTheDocument();
});

test("inputting an invalid postcode gives a negative result", async () => {
  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "YO10 5DD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode YO10 5DD is not shippable/)
  ).toBeInTheDocument();
});
