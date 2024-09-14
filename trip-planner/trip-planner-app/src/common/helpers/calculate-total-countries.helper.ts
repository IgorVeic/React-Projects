import { Country } from "../types/country.interface";

const calculateTotalCountriesPerRegion = (countries: Country[]) => {
  const totalCountriesPerRegion: { [key: string]: number } = {};

  // Loop through each country and count the number of countries in each region
  countries.forEach((country) => {
    const region = country.region.toLowerCase();
    totalCountriesPerRegion[region] =
      (totalCountriesPerRegion[region] || 0) + 1;
  });

  return totalCountriesPerRegion;
};

export default calculateTotalCountriesPerRegion;
