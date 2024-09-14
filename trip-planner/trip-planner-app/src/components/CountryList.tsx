import { Country } from "../common/types/country.interface";
import CountryCard from "./CountryCard";

interface CountryListProps {
  countries: Country[];
}

const CountryList = ({ countries }: CountryListProps) => {
  if (!countries || countries.length === 0) {
    return <div>No countries available</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-7xl">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
