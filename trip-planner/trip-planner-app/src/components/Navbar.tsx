import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEarthAmericas,
  faEarthAsia,
  faEarthEurope,
  faEarthAfrica,
  faEarthOceania,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import { Page } from "../common/types/page.enum";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const links = [
    { path: Page.HOME, label: "Home", icon: faHome },
    { path: Page.ASIA, label: "Asia", icon: faEarthAsia },
    { path: Page.EUROPE, label: "Europe", icon: faEarthEurope },
    { path: Page.AFRICA, label: "Africa", icon: faEarthAfrica },
    { path: Page.AMERICAS, label: "Americas", icon: faEarthAmericas },
    { path: Page.OCEANIA, label: "Oceania", icon: faEarthOceania },
  ];

  const handleNavigation = (path: Page): void => {
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

  const getLinkClasses = (path: Page) => {
    const baseClasses =
      "flex items-center justify-center bg-gradient-to-br from-green-700 to-green-500 text-sm sm:text-base md:text-lg lg:text-xl p-2 sm:p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 duration-300";

    const isActive = location.pathname === path;

    if (isActive) {
      return `${baseClasses} text-teal-400`;
    }
    return `${baseClasses} text-white`;
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
          <Loader />
        </div>
      )}
      <nav className="flex justify-center p-4">
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.path} className="list-none">
              <Link
                to={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.path);
                }}
                className={getLinkClasses(link.path)}
              >
                <FontAwesomeIcon icon={link.icon} className="h-6 w-6 mr-1" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
