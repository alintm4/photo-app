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
    <nav className=" z-50 shadow-xl font-sans mb-2">
      <div className="grid grid-cols-12">
        <div className="col-span-4">
          <Link to="/" className="text-3xl p-3 md:text-4xl   ">
            Home
          </Link>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-6 flex flex-row-reverse text-xl md:3xl pr-7">
          {isAuthenticated ? (
            <div>
              <Link to="/create" className="p-3 ">
                AddNote
              </Link>
              <button onClick={handleLogout} className="p-3 ">
                Logout
              </button>
            </div>
          ) : (
            <div className="col-span-6 flex flex-row-reverse text-xl md:3xl ">
              <Link to="/login" className="p-3 ">
                Login
              </Link>
              <Link to="/register" className="p-3 ">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
