import { isPostcodeShippable } from "./isPostcodeShippable";

test("takes a Southwark postcode and gives a positive result", async () => {
  const result = await isPostcodeShippable("SE1 7QD");

  expect(result).toBe(true);
});

test("takes a Lambeth postcode and gives a positive result", async () => {
  const result = await isPostcodeShippable("SE1 7QA");

  expect(result).toBe(true);
});

test("takes a York postcode and gives a negative result", async () => {
  const result = await isPostcodeShippable("YO31 1LA");

  expect(result).toBe(false);
});

test("takes an invalid postcode and gives a negative result", async () => {
  const result = await isPostcodeShippable("invalid");

  expect(result).toBe(false);
});

test("takes a postcode in the allow-list and gives a positive result", async () => {
  const result = await isPostcodeShippable("SH24 1AA");

  expect(result).toBe(true);
});

test("takes a shippable postcode with odd formatting and gives a positive result", async () => {
  const result = await isPostcodeShippable(" s  E17 q      A\t");

  expect(result).toBe(true);
});

test("takes a postcode on the allow-list with odd formatting and gives a positive result", async () => {
  const result = await isPostcodeShippable(" s  H241      A\ta");

  expect(result).toBe(true);
});
