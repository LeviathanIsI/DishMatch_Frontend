import React, { useState, useEffect } from "react";
import apiFetch from "../api/fetch";

const Matching = () => {
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      await fetchUserSavedRecipes();
      await fetchRandomRecipe();
    };
    initialize();
  }, []);

  const fetchUserSavedRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await apiFetch("/users/matched-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched saved recipes:", response);
      setSavedRecipes(response);
    } catch (error) {
      setMessage("Error fetching saved recipes: " + error.message);
    }
  };

  const fetchRandomRecipe = async () => {
    try {
      const response = await apiFetch("/recipes/random");
      console.log("Fetched random recipe:", response);
      setRecipe(response);
      checkIfUserLikesRecipe(response);
    } catch (error) {
      setMessage("Error fetching recipe: " + error.message);
    }
  };

  const checkIfUserLikesRecipe = (fetchedRecipe) => {
    console.log("Checking if user likes recipe:", fetchedRecipe);
    const alreadyLiked = savedRecipes.some(
      (savedRecipe) => savedRecipe.creator?._id === fetchedRecipe.creator?._id
    );
    if (alreadyLiked) {
      setMessage("You already like a recipe by this creator!");
    } else {
      setMessage("");
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
      await fetchUserSavedRecipes(); // Refresh saved recipes after adding
      await fetchRandomRecipe();
    } catch (error) {
      setMessage("Error adding recipe: " + error.message);
    }
  };

  const handlePass = async () => {
    setMessage(""); // Clear message before fetching a new recipe
    await fetchRandomRecipe();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex flex-col items-center space-y-6 bg-gray-800 p-10 rounded-lg shadow-lg max-w-lg">
        <h2 className="text-4xl mb-6 text-white">Matching Screen</h2>
        {recipe ? (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-3xl font-bold text-white">{recipe.name}</h3>
            <p className="text-lg text-white">{recipe.cuisine}</p>
            <p className="text-lg text-white">
              {recipe.ingredients.join(", ")}
            </p>
            <p className="text-lg text-white">
              Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
            </p>
          </div>
        ) : (
          <p className="text-lg text-white">Loading...</p>
        )}
        <div className="flex justify-between w-full mt-6">
          <button
            onClick={handleMakeIt}
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 px-6 py-3 rounded text-xl"
          >
            Make It
          </button>
          <button
            onClick={handlePass}
            className="bg-teal-500 text-gray-900 hover:bg-teal-400 px-6 py-3 rounded text-xl"
          >
            Pass
          </button>
        </div>
        {message && <p className="mt-6 text-lg text-white">{message}</p>}
      </div>
    </div>
  );
};

export default Matching;
