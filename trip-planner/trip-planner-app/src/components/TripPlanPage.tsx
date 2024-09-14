import { useContext, useState } from "react";
import { TripPlanContext } from "../contexts/TripPlanContext";
import { TripPlanItem } from "../common/types/tripPlanItem.interface";
import Modal from "./Modal";
import {
  FaTimes,
  FaExclamationCircle,
  FaPlane,
  FaTrash,
  FaSave,
  FaCalendarAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ScrollButton from "./ScrollButton";
import InsuranceOptions from "./InsuranceOptions";
import { InsuranceOption } from "../common/types/insuranceOption.interface";

const TripPlanPage = () => {
  const { tripPlan, setDaysForCountry, removeCountryFromTrip, clearTripPlan } =
    useContext(TripPlanContext);
  const [selectedCountry, setSelectedCountry] = useState<TripPlanItem | null>(
    null
  );
  const [selectedInsurance, setSelectedInsurance] =
    useState<InsuranceOption | null>(null);
  const navigate = useNavigate();

  const handleDaysChange = (country: TripPlanItem, days: number) => {
    if (days >= 1 && days <= 30) {
      setDaysForCountry(country, days);
    }
  };

  const incrementDays = (country: TripPlanItem) => {
    if (country.days < 30) {
      setDaysForCountry(country, country.days + 1);
    }
  };

  const decrementDays = (country: TripPlanItem) => {
    if (country.days > 1) {
      setDaysForCountry(country, country.days - 1);
    }
  };

  const totalDays = tripPlan.reduce((sum, country) => sum + country.days, 0);

  const handleSaveTrip = () => {
    const newTrip = {
      countries: tripPlan,
      insuranceOption: selectedInsurance,
    };
    localStorage.setItem("trip", JSON.stringify(newTrip));
    navigate("/trip-form");
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center flex items-center">
        <FaPlane className="mr-2" /> Your Trip Plan
      </h1>
      {tripPlan.length === 0 ? (
        <div className="flex flex-col items-center bg-white border border-green-200 rounded-lg p-6 shadow-md max-w-md mx-auto mt-8">
          <FaExclamationCircle className="text-5xl text-red-500 mb-4" />
          <p className="text-lg text-black font-semibold text-center">
            No countries added to your trip plan.
          </p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-2xl mb-4">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${(totalDays / (tripPlan.length * 30)) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-600 flex items-center justify-end">
              <FaCalendarAlt className="mr-1" /> Total days: {totalDays}
            </p>
          </div>
          <ul className="w-full max-w-2xl space-y-4">
            {tripPlan.map((country) => (
              <li
                key={country.name.common}
                className="grid grid-cols-1 md:grid-cols-3 items-center p-4 border rounded-lg shadow-md gap-4 hover:shadow-lg transition-shadow bg-gray-100"
              >
                <div
                  className="flex items-center space-x-2 cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={() => setSelectedCountry(country)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show details for ${country.name.common}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedCountry(country);
                  }}
                >
                  <img
                    src={country.flag}
                    alt={`${country.name.common} flag`}
                    className="w-8 h-5 rounded shadow-sm"
                  />
                  <span className="font-semibold">{country.name.common}</span>
                </div>
                <div className="flex justify-center items-center space-x-2">
                  <button
                    title="Decrease days"
                    onClick={(e) => {
                      e.stopPropagation();
                      decrementDays(country);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded-l hover:bg-red-600 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={country.days}
                    onChange={(e) =>
                      handleDaysChange(country, Number(e.target.value))
                    }
                    className="border p-1 w-16 text-center"
                    title="Set days"
                  />
                  <button
                    title="Increase days"
                    onClick={(e) => {
                      e.stopPropagation();
                      incrementDays(country);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded-r hover:bg-green-600 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    title="Remove country"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCountryFromTrip(country);
                    }}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <InsuranceOptions onSelect={setSelectedInsurance} />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={clearTripPlan}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center"
            >
              <FaTrash className="mr-2" /> Remove All
            </button>
            <button
              onClick={handleSaveTrip}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center"
            >
              <FaSave className="mr-2" /> Save Trip
            </button>
          </div>
        </>
      )}
      <ScrollButton />
      <Modal
        isOpen={!!selectedCountry}
        onClose={() => setSelectedCountry(null)}
        countryName={selectedCountry ? selectedCountry.name.common : ""}
      />
    </div>
  );
};

export default TripPlanPage;
