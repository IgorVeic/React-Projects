import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";

interface SortByProps {
  sortBy: string;
  setSortBy: (criteria: string) => void;
}

const SortBy = ({ sortBy, setSortBy }: SortByProps) => {
  // Handle the change in sorting criteria
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="p-4 flex justify-center items-center">
      <label htmlFor="sort" className="mr-2 text-lg">
        <FontAwesomeIcon icon={faSort} className="mr-2" />
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={handleSortChange}
        className="p-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-lg mb-4"
      >
        <option value="all">All</option>
        <option value="landlocked">Landlocked</option>
        <option value="notLandlocked">Not Landlocked</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="populationAsc">Population (Low to High)</option>
        <option value="populationDesc">Population (High to Low)</option>
        <option value="areaAsc">Area (Smallest to Largest)</option>
        <option value="areaDesc">Area (Largest to Smallest)</option>
        <option value="capital">Capital</option>
      </select>
    </div>
  );
};

export default SortBy;
