import React, { useState, useEffect } from "react";
import apiFetch from "../api/fetch";

const Matching = () => {
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const fetchRandomRecipe = async () => {
    try {
      const response = await apiFetch("/recipes/random");
      setRecipe(response);
      setMessage(""); // Clear the message when fetching a new recipe
    } catch (error) {
      setMessage("Error fetching recipe: " + error.message);
    }
  };

  const handleMakeIt = async () => {
    try {
      const token = localStorage.getItem("token");
      await apiFetch("/recipes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: recipe._id }),
      });
      setMessage("Recipe added to your saved recipes!");
      fetchRandomRecipe();
    } catch (error) {
      setMessage("Error adding recipe: " + error.message);
    }
  };

  const handlePass = () => {
    fetchRandomRecipe();
    setMessage(""); // Clear the message when passing a recipe
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-white">Matching Screen</h2>
        {recipe ? (
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
            <p className="text-white">{recipe.cuisine}</p>
            <p className="text-white">{recipe.ingredients.join(", ")}</p>
            <p className="text-white">
              Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
            </p>
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handleMakeIt}
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 px-4 py-2 rounded"
          >
            Make It
          </button>
          <button
            onClick={handlePass}
            className="bg-teal-500 text-gray-900 hover:bg-teal-400 px-4 py-2 rounded"
          >
            Pass
          </button>
        </div>
        {message && <p className="mt-4 text-white">{message}</p>}
      </div>
    </div>
  );
};

export default Matching;
