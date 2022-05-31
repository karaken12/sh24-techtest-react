export const isPostcodeShippable = async (postcode: string) => {
  const allowedPostcodes = ["SH241AA", "SH241AB"];

  const strippedPostcode = postcode.toUpperCase().replaceAll(/[^A-Z0-9]/g, "");

  // If on the allow-list, don't even make the API call
  if (allowedPostcodes.includes(strippedPostcode)) return true;

  const url = `https://api.postcodes.io/postcodes/${strippedPostcode}`;
  const response = await fetch(url);
  if (response.status != 200) return false;
  const jsonResponse = await response.json();
  const lsoa: string = jsonResponse.result.lsoa;

  return lsoa.startsWith("Southwark ") || lsoa.startsWith("Lambeth ");
};
