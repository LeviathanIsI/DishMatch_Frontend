import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyRecipes from "./pages/MyRecipes";
import Matching from "./pages/Matching";
import MatchedRecipes from "./pages/MatchedRecipes";
import CreateRecipe from "./pages/CreateRecipe";
import Preferences from "./pages/Preferences";
import RecipeShow from "./pages/RecipeShow";
import ProtectedRoute from "./components/ProtectedRoute";

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
            <Route
              path="/myrecipes"
              element={
                <ProtectedRoute>
                  <MyRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matching"
              element={
                <ProtectedRoute>
                  <Matching />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matched-recipes"
              element={
                <ProtectedRoute>
                  <MatchedRecipes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-recipe"
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/preferences"
              element={
                <ProtectedRoute>
                  <Preferences />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeShow />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
