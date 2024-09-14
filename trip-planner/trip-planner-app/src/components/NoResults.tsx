import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoResults = ({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    setSearchQuery("");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-8 bg-white shadow-lg rounded-lg">
      <FaExclamationCircle className="text-5xl text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        No results found.
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Try adjusting your search or filters.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-gradient-to-br from-green-400 to-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default NoResults;
