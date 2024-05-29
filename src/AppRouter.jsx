import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Matching from './pages/Matching';
import MatchedRecipes from './pages/MatchedRecipes'; // Import the new page
import Login from './pages/Login';
import Register from './pages/Register';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/matched-recipes" element={<MatchedRecipes />} /> {/* New Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
