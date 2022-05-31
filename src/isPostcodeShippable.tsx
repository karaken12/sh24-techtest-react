export const isPostcodeShippable = async (postcode: string) => {
  const allowedPostcodes = ["SH24 1AA", "SH24 1AB"];

  // If on the allow-list, don't even make the API call
  if (allowedPostcodes.includes(postcode)) return true;

  const url = `https://api.postcodes.io/postcodes/${postcode}`;
  const response = await fetch(url);
  if (response.status != 200) return false;
  const jsonResponse = await response.json();
  const lsoa: string = jsonResponse.result.lsoa;

  return lsoa.startsWith("Southwark ") || lsoa.startsWith("Lambeth ");
};
