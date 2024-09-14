import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const NotFound = () => {
  const notFoundContent = useMemo(
    () => (
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-green-100 to-green-200 pt-16">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <div className="flex justify-center mb-4">
            <FaExclamationCircle className="text-5xl text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-green-600 mt-4 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            aria-label="Go back to home page"
            className="inline-block px-6 py-3 bg-gradient-to-br from-green-400 to-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition duration-300"
          >
            Go back to home page
          </Link>
        </div>
      </div>
    ),
    []
  );

  return notFoundContent;
};

export default NotFound;
