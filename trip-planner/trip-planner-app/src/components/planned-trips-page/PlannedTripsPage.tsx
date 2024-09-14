import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { TripPlanItem, Trip } from "../../common/types/tripPlanItem.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faUser,
  faDollarSign,
  faComment,
  faMapMarkedAlt,
  faSuitcase,
  faPassport,
  faTimes,
  faWallet,
  faEdit,
  faShieldAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FaExclamationCircle } from "react-icons/fa";
import ScrollButton from "../ScrollButton";
import EditTripForm from "./EditTripForm";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

const insuranceOptions = [
  {
    id: 1,
    name: "Basic Plan",
    description: "Covers basic medical expenses and trip cancellation.",
    price: "$50",
    coverage: "Up to $10,000",
  },
  {
    id: 2,
    name: "Premium Plan",
    description:
      "Includes additional coverage for baggage loss and higher medical limits.",
    price: "$100",
    coverage: "Up to $50,000",
  },
  {
    id: 3,
    name: "Family Plan",
    description: "Comprehensive coverage for families with children.",
    price: "$150",
    coverage: "Up to $100,000",
  },
];

const PlannedTripsPage = () => {
  const [plannedTrips, setPlannedTrips] = useState<Trip[]>(() => {
    return JSON.parse(localStorage.getItem("plannedTrips") || "[]");
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTrip, setEditedTrip] = useState<Trip | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("newTripAdded") === "true") {
      setShowConfetti(true);
      localStorage.removeItem("newTripAdded");
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, []);

  const handleRemoveTrip = (index: number) => {
    const updatedTrips = plannedTrips.filter((_, i) => i !== index);
    setPlannedTrips(updatedTrips);
    localStorage.setItem("plannedTrips", JSON.stringify(updatedTrips));
  };

  const handleEditTrip = (index: number) => {
    setEditingIndex(index);
    setEditedTrip(plannedTrips[index]);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTrip(null);
    setErrors({});
  };

  const handleSaveTrip = async () => {
    if (editedTrip !== null && editingIndex !== null) {
      const validationErrors = validateTrip(editedTrip);
      if (Object.keys(validationErrors).length === 0) {
        const updatedEditedTrip = {
          ...editedTrip,
          budget: Number(editedTrip.budget),
        };
        const updatedTrips = plannedTrips.map((trip, index) =>
          index === editingIndex ? updatedEditedTrip : trip
        );
        setPlannedTrips(updatedTrips);
        localStorage.setItem("plannedTrips", JSON.stringify(updatedTrips));
        setEditingIndex(null);
        setEditedTrip(null);
      } else {
        setErrors(validationErrors);
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    if (editedTrip !== null) {
      const truncatedValue = value.slice(0, 200);
      setEditedTrip({
        ...editedTrip,
        [name]: name === "comments" ? truncatedValue : value,
      });
    }
  };

  const handleDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    countryIndex: number
  ) => {
    const { value } = event.target;
    const days = Math.min(Math.max(Number(value), 1), 30);
    if (editedTrip !== null) {
      const updatedCountries = editedTrip.countries.map((country, index) =>
        index === countryIndex ? { ...country, days } : country
      );
      setEditedTrip({ ...editedTrip, countries: updatedCountries });
    }
  };

  const handleInsuranceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (editedTrip !== null) {
      const selectedInsurance = insuranceOptions.find(
        (option) => option.name === value
      );
      setEditedTrip({
        ...editedTrip,
        insuranceOption: selectedInsurance || undefined,
      });
    }
  };

  const validateTrip = (trip: Trip) => {
    const errors: { [key: string]: string } = {};
    if (!trip.passengerEmail.includes("@")) {
      errors.passengerEmail = "Invalid email address";
    } else {
      const emailParts = trip.passengerEmail.split("@");
      const domain = emailParts[emailParts.length - 1].toLowerCase();
      const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "yahoo.com",
        "aol.com",
        "outlook.com",
        "live.com",
        "mailinator.com",
        "icloud.com",
      ];

      if (
        !allowedDomains.some((allowedDomain) => domain.includes(allowedDomain))
      ) {
        errors.passengerEmail = `Email domain (${domain}) is not allowed for editing`;
      }
    }
    if (
      !/^[A-Z][0-9]*$/.test(trip.passportNumber) ||
      trip.passportNumber.length < 6 ||
      trip.passportNumber.length > 9
    ) {
      errors.passportNumber =
        "Passport number must start with a letter from A-Z and be 6-9 characters long";
    }
    if (trip.budget < 100) {
      errors.budget = "Budget must be at least 100";
    }
    return errors;
  };

  const renderInsuranceIcon = (insuranceName: string) => {
    switch (insuranceName) {
      case "Basic Plan":
        return (
          <FontAwesomeIcon icon={faShieldAlt} className="ml-1 text-green-600" />
        );
      case "Family Plan":
        return (
          <FontAwesomeIcon icon={faUsers} className="ml-1 text-green-600" />
        );
      case "Premium Plan":
        return (
          <FontAwesomeIcon icon={faStar} className="ml-1 text-green-600" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      {showConfetti && <Confetti />}
      <h1 className="text-3xl font-bold mb-4 text-center flex items-center">
        <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
        Planned Trips
      </h1>
      {plannedTrips.length === 0 ? (
        <div className="flex flex-col items-center bg-white border border-green-200 rounded-lg p-6 shadow-md max-w-md mx-auto mt-8">
          <FaExclamationCircle className="text-5xl text-red-500 mb-4" />
          <p className="text-lg text-black font-semibold text-center">
            No planned trips yet.
          </p>
        </div>
      ) : (
        <ul className="space-y-4 w-full max-w-2xl">
          {plannedTrips.map((trip, index) => (
            <li
              key={index}
              className="border rounded-lg p-4 shadow-md bg-gray-100"
            >
              {editingIndex === index ? (
                <EditTripForm
                  editedTrip={editedTrip}
                  onChange={handleChange}
                  onDaysChange={handleDaysChange}
                  onSave={handleSaveTrip}
                  onCancelEdit={handleCancelEdit}
                  errors={errors}
                  insuranceOptions={insuranceOptions}
                  handleInsuranceChange={handleInsuranceChange}
                />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 text-green-600"
                      />
                      {trip.passengerName}
                    </h2>
                    <div>
                      <button
                        onClick={() => handleEditTrip(index)}
                        className="bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition-colors mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleRemoveTrip(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                  {trip.passportImage && (
                    <div className="mb-4">
                      <strong className="block mb-2">
                        <FontAwesomeIcon
                          icon={faPassport}
                          className="mr-2 text-green-600"
                        />
                        Passport Image:
                      </strong>
                      <img
                        src={trip.passportImage}
                        alt="Passport"
                        className="w-32 h-32 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <div className="mb-2 flex items-center">
                    <FontAwesomeIcon
                      icon={faWallet}
                      className="mr-2 text-green-600"
                    />
                    <strong className="mr-1">Budget:</strong>
                    <span className="ml-1">{trip.budget.toLocaleString()}</span>
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="ml-1 text-green-600"
                    />
                  </div>
                  <div className="mb-2 flex items-center">
                    <FontAwesomeIcon
                      icon={faComment}
                      className="mr-2 text-green-600"
                    />
                    <strong className="mr-1">Comments:</strong>
                    <div className="flex-grow overflow-hidden">
                      <div className="whitespace-pre-wrap">
                        {trip.comments ? (
                          <>
                            <span>{trip.comments}</span>
                            <FontAwesomeIcon
                              icon={faCode}
                              className="text-green-600 ml-2"
                            />
                          </>
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="text-red-600"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {trip.insuranceOption && (
                    <div className="mb-2 flex items-center">
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="mr-2 text-green-600"
                      />
                      <strong className="mr-1">Insurance Plan:</strong>
                      <span className="ml-1">{trip.insuranceOption.name}</span>
                      {renderInsuranceIcon(trip.insuranceOption.name)}
                    </div>
                  )}
                  <div>
                    <strong className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faMapMarkedAlt}
                        className="mr-2 text-green-600"
                      />
                      Countries to visit:
                    </strong>
                    <ul className="list-disc ml-7">
                      {trip.countries.map((country: TripPlanItem) => (
                        <li
                          key={country.name.common}
                          className="flex items-center"
                        >
                          <span className="mr-2">•</span>
                          <img
                            src={country.flag}
                            alt={`${country.name.common} flag`}
                            className="w-6 h-4 mr-2 rounded"
                          />
                          {country.name.common} - {country.days}{" "}
                          {country.days > 1 ? "days" : "day"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <ScrollButton />
    </div>
  );
};

export default PlannedTripsPage;
