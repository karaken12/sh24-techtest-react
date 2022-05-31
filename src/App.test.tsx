import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders a form with postcode input", () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/postcode/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveAttribute("type", "text");

  const submitElement = screen.getByText(/check postcode/i);
  expect(submitElement).toBeInTheDocument();
  expect(submitElement).toHaveAttribute("type", "submit");
});

test("submitting the form keeps the value in the input", () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "SE1 7QD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(screen.getByLabelText(/postcode/i)).toHaveValue("SE1 7QD");
});

test("inputting a valid postcode gives a positive result", async () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "SE1 7QD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode SE1 7QD is shippable/)
  ).toBeInTheDocument();
});

test("inputting an invalid postcode gives a negative result", async () => {
  render(<App />);

  const inputElement = screen.getByLabelText(/postcode/i);
  userEvent.type(inputElement, "YO10 5DD");
  const submitElement = screen.getByText(/check postcode/i);
  userEvent.click(submitElement);

  expect(
    await screen.findByText(/Postcode YO10 5DD is not shippable/)
  ).toBeInTheDocument();
});
