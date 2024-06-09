import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page after logout
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-stone-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-amber-500 text-5xl font-extrabold tracking-wider italic">
          <Link to="/matching" className="hover:text-amber-400">
            DishMatch
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-amber-500">
                Welcome,{" "}
                <span className="font-bold text-amber-500">{username}</span>
              </span>
              <div className="relative" ref={dropdownRef}>
                <button
                  className="text-amber-500 focus:outline-none border border-amber-500 p-1 rounded hover:bg-amber-700"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-10">
                    <Link
                      to="/myrecipes"
                      className="block px-4 py-2 text-amber-500 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Recipes
                    </Link>
                    <Link
                      to="/matched-recipes"
                      className="block px-4 py-2 text-amber-500 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Matched Recipes
                    </Link>
                    <Link
                      to="/create-recipe"
                      className="block px-4 py-2 text-amber-500 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create Recipe
                    </Link>
                    <Link
                      to="/preferences"
                      className="block px-4 py-2 text-amber-500 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Preferences
                    </Link>
                    <Link
                      to="/matching"
                      className="block px-4 py-2 text-amber-500 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Matching
                    </Link>
                  </div>
                )}
              </div>
              <button onClick={handleLogout} className="text-amber-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-amber-500">
                Login
              </Link>
              <Link to="/register" className="text-amber-500">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
