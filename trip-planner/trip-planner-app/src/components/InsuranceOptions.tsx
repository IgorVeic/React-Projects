import { useEffect, useState } from "react";
import { InsuranceOption } from "../common/types/insuranceOption.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faStar,
  faUsers,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

interface InsuranceOptionsProps {
  onSelect: (option: InsuranceOption | null) => void;
}

const InsuranceOptions = ({ onSelect }: InsuranceOptionsProps) => {
  const [insuranceOptions, setInsuranceOptions] = useState<InsuranceOption[]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<InsuranceOption | null>(
    null
  );

  useEffect(() => {
    const fetchInsuranceOptions = async () => {
      const data: InsuranceOption[] = [
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
      setInsuranceOptions(data);
    };

    fetchInsuranceOptions();
  }, []);

  const handleSelect = (option: InsuranceOption) => {
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
      onSelect(null);
    } else {
      setSelectedOption(option);
      onSelect(option);
    }
  };

  const getIconForPlan = (planName: string) => {
    switch (planName) {
      case "Basic Plan":
        return faShieldAlt;
      case "Premium Plan":
        return faStar;
      case "Family Plan":
        return faUsers;
      default:
        return faShieldAlt;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 mt-6 text-center">
        <FontAwesomeIcon icon={faFileAlt} className="text-black-500 mr-2" />
        Travel Insurance (Optional)
      </h2>
      <div className="flex justify-center gap-4">
        {insuranceOptions.map((option) => (
          <div
            key={option.id}
            className={`bg-white shadow-lg rounded-lg p-6 border cursor-pointer transition-transform transform hover:scale-105 ${
              selectedOption?.id === option.id
                ? "border-green-500 bg-green-100"
                : "border-gray-200"
            }`}
            style={{ width: "100%", maxWidth: "300px" }}
            onClick={() => handleSelect(option)}
          >
            <div className="flex items-center justify-center mb-4">
              <FontAwesomeIcon
                icon={getIconForPlan(option.name)}
                className={`text-5xl ${
                  selectedOption?.id === option.id
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
              {option.name}
            </h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              {option.description}
            </p>
            <div className="text-center text-gray-900 font-bold text-lg mb-2">
              {option.price}
            </div>
            <p className="text-center text-gray-700">
              Coverage: {option.coverage}
            </p>
            {selectedOption?.id === option.id && (
              <div className="text-center mt-4">
                <span className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Selected
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsuranceOptions;
