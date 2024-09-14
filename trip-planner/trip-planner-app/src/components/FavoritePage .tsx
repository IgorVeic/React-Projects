import { useContext } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import CountryCard from "./CountryCard";
import { FaExclamationCircle, FaBookmark } from "react-icons/fa";
import ScrollButton from "./ScrollButton";
import { FaTrash } from "react-icons/fa6";

const FavoritePage = () => {
  const { favorites, clearFavorites } = useContext(FavoriteContext);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4 flex items-center">
        <FaBookmark className="mr-2 text-black-500" />
        Favorite Countries
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center bg-white border border-green-200 rounded-lg p-6 shadow-md max-w-md mx-auto mt-8">
          <FaExclamationCircle className="text-5xl text-red-500 mb-4" />
          <p className="text-lg text-black font-semibold text-center">
            No favorite countries yet.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-6xl">
            {favorites.map((country, index) => {
              // Add safety checks before rendering the country card
              if (!country || !country.name || !country.name.common) {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-center bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md"
                  >
                    Invalid country data
                  </div>
                );
              }

              return <CountryCard key={country.name.common} country={country} />;
            })}
          </div>

          <button
            onClick={clearFavorites}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center"
          >
            <FaTrash className="mr-2" />
            Clear All
          </button>
        </>
      )}
      <ScrollButton />
    </div>
  );
};

export default FavoritePage;
