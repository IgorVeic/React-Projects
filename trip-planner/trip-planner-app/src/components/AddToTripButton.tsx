import { useContext } from "react";
import { TripPlanContext } from "../contexts/TripPlanContext";
import { Country } from "../common/types/country.interface";

interface AddToTripButtonProps {
  country: Country;
}

const AddToTripButton = ({ country }: AddToTripButtonProps) => {
  const { tripPlan, addCountryToTrip } = useContext(TripPlanContext);

  const isAdded = tripPlan.some(
    (tripCountry) => tripCountry.name.common === country.name.common
  );

  const handleAddToTrip = () => {
    if (!isAdded) {
      addCountryToTrip(country);
    }
  };

  return (
    <button
      onClick={handleAddToTrip}
      className={`mt-2 px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${
        isAdded
          ? "bg-green-500 text-white cursor-not-allowed"
          : "bg-gray-200 text-black hover:bg-gray-300"
      }`}
      disabled={isAdded}
    >
      {isAdded ? "Added" : "Add to Trip Plan"}
    </button>
  );
};

export default AddToTripButton;
