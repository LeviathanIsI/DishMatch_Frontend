import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center py-4">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-gray-200 hover:text-yellow-500">Home</Link></li>
          <li><Link to="/register" className="text-gray-200 hover:text-yellow-500">Register</Link></li>
          <li><Link to="/login" className="text-gray-200 hover:text-yellow-500">Login</Link></li>
          <li><Link to="/recipes" className="text-gray-200 hover:text-yellow-500">Recipes</Link></li>
          <li><Link to="/matching" className="text-gray-200 hover:text-yellow-500">Matching</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
