import { useEffect, useState } from "react";
import {
  FaTimes,
  FaLanguage,
  FaClock,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaBorderAll,
} from "react-icons/fa";
import axios from "axios";
import { CountryDetails } from "../common/types/countryDetails.interface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryName: string;
}

const Modal = ({ isOpen, onClose, countryName }: ModalProps) => {
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(
    null
  );

  useEffect(() => {
    if (isOpen && countryName) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          const countryData = response.data[0];
          const details: CountryDetails = {
            flag: countryData.flags.png,
            languages: countryData.languages,
            timezones: countryData.timezones,
            currencies: countryData.currencies,
            subregion: countryData.subregion,
            borders: countryData.borders || [],
          };
          setCountryDetails(details);
        })
        .catch((error) => {
          console.error("Error fetching country details:", error);
        });
    }
  }, [isOpen, countryName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative p-1 max-w-md mx-auto">
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #28b487, #7dd56f)",
            padding: "2px",
            borderRadius: "0.75rem",
          }}
        ></div>
        <div className="relative bg-white rounded-lg p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
          {countryDetails ? (
            <div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold mr-2">{countryName}</h2>
                <img
                  src={countryDetails.flag}
                  alt={`${countryName} flag`}
                  className="w-10 h-6 rounded shadow-sm"
                />
              </div>
              <div className="mb-2 flex items-center">
                <FaLanguage className="mr-2 text-green-600" />
                <strong className="mr-1">Languages:</strong>
                <span>
                  {Object.values(countryDetails.languages).join(", ")}
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <FaClock className="mr-2 text-green-600" />
                <strong className="mr-1">Timezones:</strong>
                <span>{countryDetails.timezones.join(", ")}</span>
              </div>
              <div className="mb-2 flex items-center">
                <FaMoneyBill className="mr-2 text-green-600" />
                <strong className="mr-1">Currencies:</strong>
                <span>
                  {Object.values(countryDetails.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(", ")}
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-600" />
                <strong className="mr-1">Subregion:</strong>
                <span>{countryDetails.subregion}</span>
              </div>
              <div className="mb-2 flex items-center">
                <FaBorderAll className="mr-2 text-green-600" />
                <strong className="mr-1">Borders:</strong>
                <span>
                  {countryDetails.borders.length > 0
                    ? countryDetails.borders.join(", ")
                    : "No borders"}
                </span>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
