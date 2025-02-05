import { Link } from "react-router-dom";

const Invalid = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Invalid Link</h1>
          <p className="mt-4 text-lg text-gray-700">
            Oops! It looks like the link you followed is either invalid or not
            found.
          </p>
          <p className="mt-2 text-gray-500">
            Please check your link, or contact support if you need further
            assistance.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-block px-6 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invalid;
