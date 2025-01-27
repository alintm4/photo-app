import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 shadow-xl font-sans text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Section */}
        <div>
          <Link to="/" className="text-3xl md:text-4xl font-bold">
            Home
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex space-x-6 text-lg md:text-xl">
          {isAuthenticated ? (
            <>
              <Link
                to="/create"
                className="p-2 px-4 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                AddNote
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 px-4 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-2 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-2 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
