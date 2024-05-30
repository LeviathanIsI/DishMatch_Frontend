import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyRecipes from './pages/MyRecipes';
import Matching from './pages/Matching';
import MatchedRecipes from './pages/MatchedRecipes'; // Import the new page

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myrecipes" element={<MyRecipes />} />
            <Route path="/matching" element={<Matching />} />
            <Route path="/matched-recipes" element={<MatchedRecipes />} /> {/* New Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
