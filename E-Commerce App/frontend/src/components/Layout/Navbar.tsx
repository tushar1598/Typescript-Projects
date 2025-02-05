import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const { user, authLoading } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  if (authLoading) {
    return null;
  }

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-blue-600">
              <Link to="/">Brand</Link>
            </div>
            {user ? (
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/users/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </Link>
                <Link
                  to="/users/my-account"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Account
                </Link>
                <Link
                  to="/users/download"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Download
                </Link>
                <Link
                  to="/users/sign-out"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Log-out
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/users/sign-in"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign-in
                </Link>
                <Link
                  to="/users/sign-up"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign-up
                </Link>
              </div>
            )}
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-700 focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16m-7 6h7"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
          {menuOpen &&
            (user ? (
              <div className="md:hidden flex flex-col space-y-2 p-4 bg-white shadow-md">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/users/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </Link>
                <Link
                  to="/users/my-account"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Account
                </Link>
                <Link
                  to="/users/download"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Download
                </Link>
                <Link
                  to="/users/Sign-out"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Log-out
                </Link>
              </div>
            ) : (
              <div className="md:hidden flex flex-col space-y-2 p-4 bg-white shadow-md">
                <Link to="/" className="text-gray-700 hover:text-blue-600">
                  Home
                </Link>
                <Link
                  to="/sign-in"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign-in
                </Link>
                <Link
                  to="/sign-up"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign-up
                </Link>
              </div>
            ))}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
