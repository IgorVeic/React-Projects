import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 600),
    [setSearchQuery]
  );

  useEffect(() => {
    handleSearch(localQuery);
  }, [localQuery, handleSearch]);

  useEffect(() => {
    // Clear the local query after search
    if (!searchQuery) {
      setLocalQuery("");
    }
  }, [searchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value);
  };

  return (
    <div className="p-4 flex justify-center w-full">
      <div className="relative w-full max-w-lg mb-6">
        <input
          type="text"
          value={localQuery}
          onChange={handleChange}
          placeholder="Search by country name..."
          aria-label="Search by country name"
          className="p-2 border border-green-400 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent pl-10 text-base placeholder-gray-400 shadow-md"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
