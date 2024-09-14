import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCity,
  faUsers,
  faGlobe,
  faMap,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { Country } from "../common/types/country.interface";
import AddToTripButton from "./AddToTripButton";
import { FavoriteContext } from "../contexts/FavoriteContext";

interface CountryCardProps {
  country: Country;
}

const CountryCard = ({ country }: CountryCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);

  const isFavorite = favorites.some(
    (fav) => fav.name?.common === country.name?.common
  );

  const [isClicked, setIsClicked] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(country);
    } else {
      addFavorite(country);
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Reset the clicked state after 300ms
  };

  const borderColor = country.landlocked ? "#50C878" : "#4169E1";
  const hoverBgColor = country.landlocked
    ? "hover:bg-gradient-to-br hover:from-green-400 hover:to-green-600"
    : "hover:bg-gradient-to-br hover:from-blue-400 hover:to-blue-600";

  return (
    <div
      className={`relative country-item border-2 rounded-lg p-4 mb-4 ${hoverBgColor} transform hover:scale-105 transition-transform duration-300 text-black hover:text-white shadow-lg cursor-pointer`}
      style={{ borderColor }}
    >
      <button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isFavorite ? "text-red-500" : "text-gray-500"
        } hover:text-red-500 transition-all duration-300 transform ${
          isClicked ? "scale-125" : ""
        }`}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
      <div className="flex flex-col items-center mb-4">
        <img
          src={country.flag || ""}
          alt={`${country.name?.common || "Country"} flag`}
          className="w-24 h-16 mb-2 rounded"
        />
        <h2 className="text-2xl font-bold mb-2 text-center">
          {country.name?.common || "Unknown Country"}
        </h2>
      </div>
      <div className="text-center">
        <p className="mb-2">
          <FontAwesomeIcon icon={faCity} className="mr-2" />
          Capital: {country.capital?.join(", ") || "N/A"}
        </p>
        <p className="mb-2">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          Population: {country.population?.toLocaleString() || "N/A"}
        </p>
        <p className="mb-2">
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          Region: {country.region || "N/A"}
        </p>
        <p className="mb-2">
          <FontAwesomeIcon icon={faMap} className="mr-2" />
          Area: {country.area?.toLocaleString() || "N/A"} km²
        </p>
        <p className="mb-2">
          <FontAwesomeIcon icon={faWater} className="mr-2" />
          Landlocked: {country.landlocked ? "Yes" : "No"}{" "}
        </p>
        <AddToTripButton country={country} />{" "}
      </div>
    </div>
  );
};

export default CountryCard
