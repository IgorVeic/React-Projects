import { useEffect } from "react";
import { useCountryContext } from "../contexts/CountryContext";
import { useParams } from "react-router-dom";

const useFetchCountries = (page: string) => {
  const { countryName } = useParams<{
    countryName: string;
  }>();
  const {
    fetchCountryByName,
    fetchRegionCountries,
    setFilteredCountries,
    setSearchQuery,
  } = useCountryContext();

  useEffect(() => {
    if (page === "Search" && countryName) {
      fetchCountryByName(countryName);
    } else if (page !== "Home" && page !== "Search" && page !== "Region") {
      fetchRegionCountries(page.toLowerCase());
    }
  }, [countryName, page, fetchCountryByName, fetchRegionCountries]);

  useEffect(() => {
    if (page === "Home") {
      setFilteredCountries([]);
      setSearchQuery("");
    }
  }, [page, setFilteredCountries, setSearchQuery]);
};

export default useFetchCountries;
