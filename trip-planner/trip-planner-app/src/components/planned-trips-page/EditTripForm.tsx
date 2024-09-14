import React, { useState } from "react";
import { Trip } from "../../common/types/tripPlanItem.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimesCircle,
  faEnvelope,
  faWallet,
  faPassport,
  faComment,
  faFileAlt,
  faMapMarkedAlt,
  faUser,
  faEdit, // Import the edit icon
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";

interface EditTripFormProps {
  editedTrip: Trip | null;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onDaysChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    countryIndex: number
  ) => void;
  onSave: () => Promise<void>;
  onCancelEdit: () => void;
  errors: { [key: string]: string };
  insuranceOptions: {
    id: number;
    name: string;
    description: string;
    price: string;
    coverage: string;
  }[];
  handleInsuranceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditTripForm = ({
  editedTrip,
  onChange,
  onDaysChange,
  onSave,
  onCancelEdit,
  errors,
  insuranceOptions,
  handleInsuranceChange,
}: EditTripFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await onSave();
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col space-y-4">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
          <Loader />
        </div>
      )}
      <h1 className="text-2xl font-bold text-center mb-4 flex items-center justify-center">
        <FontAwesomeIcon icon={faEdit} className="mr-2 text-green-600" />
        Edit Your Trip
      </h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-green-600" />
          <input
            type="text"
            name="passengerName"
            value={editedTrip?.passengerName}
            onChange={onChange}
            className="border rounded px-2 py-1"
          />
        </h2>
      </div>
      <div className="mb-4">
        <strong className="block mb-2">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-green-600" />
          Email:
        </strong>
        <input
          type="email"
          name="passengerEmail"
          value={editedTrip?.passengerEmail}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.passengerEmail && (
          <p className="text-red-500 text-sm">{errors.passengerEmail}</p>
        )}
      </div>
      <div className="mb-4">
        <strong className="block mb-2">
          <FontAwesomeIcon icon={faWallet} className="mr-2 text-green-600" />
          Budget:
        </strong>
        <input
          type="number"
          name="budget"
          value={editedTrip?.budget}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full"
          min={1}
        />
        {errors.budget && (
          <p className="text-red-500 text-sm">{errors.budget}</p>
        )}
      </div>
      <div className="mb-4">
        <strong className="block mb-2">
          <FontAwesomeIcon icon={faPassport} className="mr-2 text-green-600" />
          Passport Number:
        </strong>
        <input
          type="text"
          name="passportNumber"
          value={editedTrip?.passportNumber}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.passportNumber && (
          <p className="text-red-500 text-sm">{errors.passportNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <strong className="block mb-2">
          <FontAwesomeIcon icon={faComment} className="mr-2 text-green-600" />
          Comments (max 200 characters):
        </strong>
        <textarea
          name="comments"
          value={editedTrip?.comments}
          onChange={onChange}
          className="border rounded px-2 py-1 w-full max-h-40 overflow-y-auto resize-y"
          maxLength={200}
          style={{ resize: "vertical", minHeight: "80px" }}
        />
      </div>
      <div className="mb-4">
        <strong className="block mb-2">
          <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-green-600" />
          Insurance Plan:
        </strong>
        <select
          value={editedTrip?.insuranceOption?.name || ""}
          onChange={handleInsuranceChange}
          className="border rounded px-2 py-1 w-full"
        >
          <option value="">None</option>
          {insuranceOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <strong className="flex items-center mb-2">
          <FontAwesomeIcon
            icon={faMapMarkedAlt}
            className="mr-2 text-green-600"
          />
          Countries to visit:
        </strong>
        <ul className="list-disc ml-7">
          {editedTrip?.countries.map((country, countryIndex) => (
            <li key={country.name.common} className="flex items-center">
              <span className="mr-2">•</span>
              <img
                src={country.flag}
                alt={`${country.name.common} flag`}
                className="w-6 h-4 mr-2 rounded"
              />
              {country.name.common} -
              <input
                type="number"
                name="days"
                value={country.days}
                onChange={(event) => onDaysChange(event, countryIndex)}
                className="border rounded px-2 py-1 w-20 ml-2"
                min={1}
                max={30}
              />
              {country.days === 1 ? "day" : "days"}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition-colors"
        >
          <FontAwesomeIcon icon={faSave} /> Save
        </button>
        <button
          onClick={onCancelEdit}
          className="bg-gray-500 text-white px-2 py-1 rounded-full hover:bg-gray-600 transition-colors"
        >
          <FontAwesomeIcon icon={faTimesCircle} /> Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTripForm;
