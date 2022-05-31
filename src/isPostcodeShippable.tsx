export const isPostcodeShippable = async (postcode: string) => {
  const url = `https://api.postcodes.io/postcodes/${postcode}`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const lsoa: string = jsonResponse.result.lsoa;

  return lsoa.startsWith("Southwark ") || lsoa.startsWith("Lambeth ");
};
