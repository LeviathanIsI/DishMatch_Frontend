import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg">
          <Link to="/">DishMatch</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/myrecipes" className="text-white">Recipes</Link>
          <Link to="/matching" className="text-white">Matching</Link>
          <Link to="/matched-recipes" className="text-white">Matched Recipes</Link> {/* New Route */}
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/register" className="text-white">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
