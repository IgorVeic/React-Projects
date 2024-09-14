import React, { useContext, useState, useEffect } from "react";
import { TripPlanContext } from "../contexts/TripPlanContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faWallet,
  faPassport,
  faComment,
  faInfoCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { InsuranceOption } from "../common/types/insuranceOption.interface";
import Loader from "./Loader"; // Import the Loader component

const TripFormPage = () => {
  const { tripPlan, clearTripPlan } = useContext(TripPlanContext);
  const navigate = useNavigate();
  const [passportImage, setPassportImage] = useState<string | null>(null);
  const [selectedInsurance, setSelectedInsurance] =
    useState<InsuranceOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state

  useEffect(() => {
    const trip = JSON.parse(localStorage.getItem("trip") || "{}");
    if (trip.insuranceOption) {
      setSelectedInsurance(trip.insuranceOption);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const commentLength = watch("comments", "").length;

  const onSubmit = async (data: any) => {
    setIsLoading(true); // Set loading state to true
    setTimeout(async () => {
      // Delay to show loader for at least 500ms
      try {
        const newTrip = {
          ...data,
          budget: parseFloat(data.budget),
          countries: tripPlan,
          passportImage,
          insuranceOption: selectedInsurance,
        };
        const savedTrips = JSON.parse(
          localStorage.getItem("plannedTrips") || "[]"
        );
        savedTrips.push(newTrip);
        localStorage.setItem("plannedTrips", JSON.stringify(savedTrips));
        localStorage.setItem("newTripAdded", "true"); // Set flag for new trip
        clearTripPlan();
        navigate("/planned-trips");
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }, 500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFieldValid = (field: string) => {
    return !errors[field] && watch(field);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
          <Loader />
        </div>
      )}
      <div className="p-4 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 p-6 border rounded-lg shadow-lg w-full max-w-md bg-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="mr-2 text-green-600"
            />
            Your Information
          </h2>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="passengerName"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2 text-green-600" />
              Passenger Name
            </label>
            <input
              type="text"
              id="passengerName"
              minLength={3}
              required
              placeholder="Enter your full name"
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.passengerName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              {...register("passengerName", {
                required: "Passenger name is required",
                minLength: {
                  value: 3,
                  message: "Passenger name must be at least 3 characters long",
                },
              })}
              onBlur={() => trigger("passengerName")}
            />
            {isFieldValid("passengerName") && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="absolute top-9 right-2 text-green-500 bg-white rounded-full"
              />
            )}
            {errors.passengerName && (
              <p className="text-sm mt-1 text-red-500">
                {errors.passengerName.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="passengerEmail"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-green-600"
              />
              Passenger Email
            </label>
            <input
              type="email"
              id="passengerEmail"
              required
              placeholder="Enter your email address"
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.passengerEmail
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              {...register("passengerEmail", {
                required: "Passenger email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|aol|icloud|mailinator|icloud)\.com$/i,
                  message: "Entered value does not match email format",
                },
              })}
              onBlur={() => trigger("passengerEmail")}
            />
            {isFieldValid("passengerEmail") && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="absolute top-9 right-2 text-green-500 bg-white rounded-full"
              />
            )}
            {errors.passengerEmail && (
              <p className="text-sm mt-1 text-red-500">
                {errors.passengerEmail.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2" htmlFor="budget">
              <FontAwesomeIcon
                icon={faWallet}
                className="mr-2 text-green-600"
              />
              Budget
            </label>
            <input
              type="number"
              id="budget"
              min={100}
              required
              placeholder="Enter your budget"
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.budget
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              {...register("budget", {
                required: "Budget is required",
                min: {
                  value: 100,
                  message: "Budget must be at least 100",
                },
              })}
              onBlur={() => trigger("budget")}
            />
            <small className="text-gray-500">
              The minimum budget required for a trip is $100.
            </small>
            {isFieldValid("budget") && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="absolute top-9 right-2 text-green-500 bg-white rounded-full"
              />
            )}
            {errors.budget && (
              <p className="text-sm mt-1 text-red-500">
                {errors.budget.message as string}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="passportNumber"
            >
              <FontAwesomeIcon
                icon={faPassport}
                className="mr-2 text-green-600"
              />
              Passport Number
            </label>
            <input
              type="text"
              id="passportNumber"
              pattern="[A-Za-z][0-9]+"
              minLength={6}
              maxLength={9}
              required
              placeholder="Enter your passport number"
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.passportNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              }`}
              {...register("passportNumber", {
                required: "Passport number is required",
                pattern: {
                  value: /^[A-Za-z][0-9]+$/,
                  message:
                    "Must start with a letter followed by numbers (e.g., A1234567)",
                },
                minLength: {
                  value: 6,
                  message: "Passport number must be at least 6 characters long",
                },
                maxLength: {
                  value: 9,
                  message: "Passport number must be at most 9 characters long",
                },
              })}
              onBlur={() => trigger("passportNumber")}
            />
            {isFieldValid("passportNumber") && (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="absolute top-9 right-2 text-green-500 bg-white rounded-full"
              />
            )}
            <small className="text-gray-500">
              Must start with a letter followed by numbers (e.g., A1234567).
            </small>
            {errors.passportNumber && (
              <p className="text-sm mt-1 text-red-500">
                {errors.passportNumber.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="comments"
            >
              <FontAwesomeIcon
                icon={faComment}
                className="mr-2 text-green-600"
              />
              Comments
            </label>
            <textarea
              id="comments"
              rows={3}
              maxLength={200}
              placeholder="Enter any comments"
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.comments
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-green-500"
              } resize-none max-h-32`}
              {...register("comments")}
            />
            <small className="text-gray-500">
              Maximum length: {200 - commentLength} characters.
            </small>
            {errors.comments && (
              <p className="text-sm mt-1 text-red-500">
                {errors.comments.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="passportImage"
            >
              <FontAwesomeIcon
                icon={faPassport}
                className="mr-2 text-green-600"
              />
              Upload Passport Image (Optional)
            </label>
            <input
              type="file"
              id="passportImage"
              name="passportImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
            />
            <small className="text-gray-500">
              Accepted formats: JPEG, PNG, GIF, BMP, WebP, SVG.
            </small>
            <small className="text-gray-500 mt-1 block">
              Recommended size: 600x600 pixels.
            </small>
            {passportImage && (
              <div className="mt-4 relative">
                <strong className="block mb-2">Passport Image Preview:</strong>
                <img
                  src={passportImage}
                  alt="Passport Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/trip-plan")}
              className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors w-1/2 mr-2 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors w-1/2 font-semibold"
            >
              Submit Trip
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TripFormPage;
