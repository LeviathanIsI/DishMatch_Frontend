import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, username, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg">
          <Link to="/">DishMatch</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/myrecipes" className="text-white">
            My Recipes
          </Link>
          <Link to="/matching" className="text-white">
            Matching
          </Link>
          <Link to="/matched-recipes" className="text-white">
            Matched Recipes
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/create-recipe" className="text-white">
                Create Recipe
              </Link>
              <span className="text-white">
                Welcome,{" "}
                <span className="font-bold text-yellow-500">{username}</span>
              </span>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
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
