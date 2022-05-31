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
