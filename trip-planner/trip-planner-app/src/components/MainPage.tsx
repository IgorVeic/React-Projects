import { useState, useEffect } from "react";
import { useCountryContext } from "../contexts/CountryContext";
import SearchBar from "./Searchbar";
import CountryList from "./CountryList";
import RegionHeading from "./RegionHeading";
import useFetchCountries from "../hooks/useFetchCountries";
import Pagination from "./pagination/Pagination";
import ScrollButton from "./ScrollButton";
import SortBy from "./SortBy";
import NoResults from "./NoResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

interface MainPageProps {
  page: string;
}

const MainPage = ({ page }: MainPageProps) => {
  const {
    top10Countries,
    searchQuery,
    setSearchQuery,
    filteredCountries,
    totalCountriesPerRegion,
    calculateTotalCountries,
    isLoading,
  } = useCountryContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("all");
  const [noResults, setNoResults] = useState(false);
  const itemsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1);
  }, [page, sortBy]);

  useEffect(() => {
    calculateTotalCountries(sortBy as "all" | "landlocked" | "notLandlocked");
  }, [filteredCountries, sortBy, calculateTotalCountries]);

  useEffect(() => {
    if (searchQuery && filteredCountries.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [searchQuery, filteredCountries]);

  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;

  const filteredAndSortedCountries = [...filteredCountries]
    .filter((country) => {
      if (sortBy === "landlocked") return country.landlocked;
      if (sortBy === "notLandlocked") return !country.landlocked;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "nameAsc")
        return a.name.common.localeCompare(b.name.common);
      if (sortBy === "nameDesc")
        return b.name.common.localeCompare(a.name.common);
      if (sortBy === "populationAsc") return a.population - b.population;
      if (sortBy === "populationDesc") return b.population - a.population;
      if (sortBy === "areaAsc") return a.area - b.area;
      if (sortBy === "areaDesc") return b.area - a.area;
      if (sortBy === "capital")
        return (a.capital[0] || "").localeCompare(b.capital[0] || "");
      return 0;
    });

  const currentCountries = filteredAndSortedCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useFetchCountries(page);

  const displayCountries =
    page === "Home" && !searchQuery ? top10Countries : currentCountries;

  const totalCountries = filteredAndSortedCountries.length;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {page === "Home" && (
        <>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {searchQuery ? (
            <h1 className="text-3xl font-bold mb-5">
              <FontAwesomeIcon icon={faSearch} className="mr-2" />
              Search Results:
            </h1>
          ) : (
            <h1 className="text-3xl font-bold mb-5">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              10 Most Popular Tourist Destinations
            </h1>
          )}
        </>
      )}
      {noResults && <NoResults setSearchQuery={setSearchQuery} />}
      {!noResults && page !== "Home" && (
        <>
          <RegionHeading
            page={page}
            totalCountriesPerRegion={totalCountriesPerRegion}
            sortBy={sortBy}
            totalCountries={totalCountries}
          />
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          <div className="w-full max-w-4xl md:max-w-6xl lg:max-w-7xl mx-auto mb-4">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredAndSortedCountries.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
      {!noResults && (
        <div className="w-full max-w-4xl md:max-w-6xl lg:max-w-7xl">
          <CountryList countries={displayCountries} />
        </div>
      )}
      <ScrollButton />
    </div>
  );
};

export default MainPage;
