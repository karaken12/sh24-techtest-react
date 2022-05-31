const allowedPostcodes = ["SH241AA", "SH241AB"];
const allowedLsoas = ["Southwark", "Lambeth"];

export const isPostcodeShippable = async (postcode: string) => {
  const strippedPostcode = postcode.toUpperCase().replaceAll(/[^A-Z0-9]/g, "");

  // If on the allow-list, don't even make the API call
  if (postcodeIsOnAllowList(strippedPostcode)) return true;

  return lsoaIsShippable(await getLsoaForPostcode(strippedPostcode));
};

const postcodeIsOnAllowList = (strippedPostcode: string) =>
  allowedPostcodes.includes(strippedPostcode);

const lsoaIsShippable = (lsoa: string) =>
  allowedLsoas.some((allowedLsoa) => lsoa.startsWith(allowedLsoa + " "));

const getLsoaForPostcode = async (strippedPostcode: string) => {
  const url = `https://api.postcodes.io/postcodes/${strippedPostcode}`;
  const response = await fetch(url);
  if (response.status != 200) return "";
  const jsonResponse = await response.json();
  return jsonResponse.result.lsoa;
};
