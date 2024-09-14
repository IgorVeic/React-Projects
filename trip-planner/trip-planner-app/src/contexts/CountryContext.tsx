import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { Country } from "../common/types/country.interface";
import calculateTotalCountriesPerRegion from "../common/helpers/calculate-total-countries.helper";

export interface CountryContextProps {
  countries: Country[];
  top10Countries: Country[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCountries: Country[];
  setFilteredCountries: (countries: Country[]) => void;
  totalCountriesPerRegion: Record<string, number>;
  fetchCountryByName: (name: string) => Promise<void>;
  fetchRegionCountries: (region: string) => Promise<void>;
  calculateTotalCountries: (
    landlockedStatus: "all" | "landlocked" | "notLandlocked"
  ) => void;
  isLoading: boolean;
}

export const CountryContext = createContext<CountryContextProps | undefined>(
  undefined
);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [top10Countries, setTop10Countries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [totalCountriesPerRegion, setTotalCountriesPerRegion] = useState<
    Record<string, number>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCountries = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const allCountries = response.data.map((country: any, index: number) => ({
        id: index + 1,
        name: country.name,
        capital: country.capital || ["N/A"],
        region: country.region,
        area: country.area,
        flag: country.flags?.png,
        population: country.population,
        landlocked: country.landlocked,
      }));
      setCountries(allCountries);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setIsLoading(false);
    }
  };

  const fetchTop10Countries = async () => {
    setIsLoading(true);
    const top10CountryNames = [
      "Spain",
      "Italy",
      "France",
      "China",
      "Japan",
      "Argentina",
      "Brazil",
      "Australia",
      "Greece",
      "Chile",
    ];

    try {
      const responses = await Promise.all(
        top10CountryNames.map((name) =>
          axios.get(`https://restcountries.com/v3.1/name/${name}`)
        )
      );
      const top10 = responses.map((response, index) => {
        const country = response.data[0];
        return {
          id: index + 1,
          name: country.name,
          capital: country.capital || ["N/A"],
          region: country.region,
          area: country.area,
          flag: country.flags?.png,
          population: country.population,
          landlocked: country.landlocked,
        };
      });
      setTop10Countries(top10);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching top 10 countries:", error);
      setIsLoading(false);
    }
  };

  const fetchCountryByName = async (name: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      if (response.data.length === 0) {
        setFilteredCountries([]);
      } else {
        const countryData = response.data.map(
          (country: any, index: number) => ({
            id: index + 1,
            name: country.name,
            capital: country.capital || ["N/A"],
            region: country.region,
            area: country.area,
            flag: country.flags?.png,
            population: country.population,
            landlocked: country.landlocked,
          })
        );
        setFilteredCountries(countryData);
        setSearchQuery(""); // Clear the search query after fetching
      }
    } catch (error) {
      console.error("Error fetching country by name:", error);
      setFilteredCountries([]);
    }
  };

  const fetchRegionCountries = async (region: string) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );
      if (response.data.length === 0) {
        setFilteredCountries([]);
      } else {
        const regionCountriesData = response.data.map(
          (country: any, index: number) => ({
            id: index + 1,
            name: country.name,
            capital: country.capital || ["N/A"],
            region: country.region,
            area: country.area,
            flag: country.flags?.png,
            population: country.population,
            landlocked: country.landlocked,
          })
        );
        setFilteredCountries(regionCountriesData);
      }
    } catch (error) {
      console.error("Error fetching region countries:", error);
      setFilteredCountries([]);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchTop10Countries();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  }, [searchQuery, countries]);

  useEffect(() => {
    const computedTotalCountriesPerRegion =
      calculateTotalCountriesPerRegion(countries);
    setTotalCountriesPerRegion(computedTotalCountriesPerRegion);
  }, [countries]);

  const calculateTotalCountries = (
    landlockedStatus: "all" | "landlocked" | "notLandlocked"
  ) => {
    const filtered = countries.filter((country) => {
      if (landlockedStatus === "landlocked") return country.landlocked;
      if (landlockedStatus === "notLandlocked") return !country.landlocked;
      return true;
    });
    setTotalCountriesPerRegion(calculateTotalCountriesPerRegion(filtered));
  };

  const contextValue: CountryContextProps = {
    countries,
    top10Countries,
    searchQuery,
    setSearchQuery,
    filteredCountries,
    setFilteredCountries,
    totalCountriesPerRegion,
    fetchCountryByName,
    fetchRegionCountries,
    calculateTotalCountries,
    isLoading,
  };

  return (
    <CountryContext.Provider value={contextValue}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
