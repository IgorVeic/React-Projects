import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faPlane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { TripPlanContext } from "../contexts/TripPlanContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import Loader from "./Loader";

const Header = () => {
  const { tripPlan } = useContext(TripPlanContext);
  const { favorites } = useContext(FavoriteContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, [navigate]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
          <Loader />
        </div>
      )}
      <header
        className="text-white p-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #28b487, #7dd56f)" }}
      >
        <div className="flex items-center cursor-pointer">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
          >
            <img
              src="/images/trip-planner-high-resolution-logo-transparent.png"
              alt="Trip Planner Logo"
              className="mr-4 md:mr-6"
              width="100"
              height="100"
            />
          </Link>
        </div>
        <h1 className="text-5xl font-bold text-center flex-grow">
          Trip Planner
        </h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/trip-plan"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/trip-plan");
            }}
            className="relative bg-white text-green-700 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faPlane} className="mr-2" />
            Trip Plan
            {tripPlan.length > 0 && (
              <span className="absolute top-0 right-0 mt-[-5px] mr-[-5px] bg-teal-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
                {tripPlan.length}
              </span>
            )}
          </Link>
          <Link
            to="/planned-trips"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/planned-trips");
            }}
            className="bg-white text-green-700 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
            Planned Trips
          </Link>
          <Link
            to="/favorites"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/favorites");
            }}
            className="relative bg-white text-green-700 p-4 rounded-full shadow hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faHeart} />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 mt-[-5px] mr-[-5px] bg-teal-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
