import { createContext, useState, useEffect, ReactNode } from "react";
import { Country } from "../common/types/country.interface";
import { TripPlanItem } from "../common/types/tripPlanItem.interface";

interface TripPlanContextProps {
  tripPlan: TripPlanItem[];
  addCountryToTrip: (country: Country) => void;
  removeCountryFromTrip: (country: Country) => void;
  setDaysForCountry: (country: Country, days: number) => void;
  clearTripPlan: () => void; // Add clearTripPlan method
}

export const TripPlanContext = createContext<TripPlanContextProps>({
  tripPlan: [],
  addCountryToTrip: () => {},
  removeCountryFromTrip: () => {},
  setDaysForCountry: () => {},
  clearTripPlan: () => {},
});

interface TripPlanProviderProps {
  children: ReactNode;
}

export const TripPlanProvider = ({ children }: TripPlanProviderProps) => {
  const [tripPlan, setTripPlan] = useState<TripPlanItem[]>(() => {
    const savedTripPlan = localStorage.getItem("tripPlan");
    return savedTripPlan ? JSON.parse(savedTripPlan) : [];
  });

  useEffect(() => {
    localStorage.setItem("tripPlan", JSON.stringify(tripPlan));
  }, [tripPlan]);

  const addCountryToTrip = (country: Country) => {
    setTripPlan([...tripPlan, { ...country, days: 1 }]);
  };

  const removeCountryFromTrip = (country: Country) => {
    setTripPlan(
      tripPlan.filter(
        (tripCountry) => tripCountry.name.common !== country.name.common
      )
    );
  };

  const setDaysForCountry = (country: Country, days: number) => {
    setTripPlan(
      tripPlan.map((tripCountry) =>
        tripCountry.name.common === country.name.common
          ? { ...tripCountry, days }
          : tripCountry
      )
    );
  };

  const clearTripPlan = () => {
    setTripPlan([]);
  };

  return (
    <TripPlanContext.Provider
      value={{
        tripPlan,
        addCountryToTrip,
        removeCountryFromTrip,
        setDaysForCountry,
        clearTripPlan,
      }}
    >
      {children}
    </TripPlanContext.Provider>
  );
};
