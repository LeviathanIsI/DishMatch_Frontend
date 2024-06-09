import React, { useState, useEffect } from "react";
import apiFetch from "../api/fetch";

const Matching = () => {
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const fetchedRecipes = await fetchUserSavedRecipes();
      const randomRecipe = await fetchRandomRecipe();
      checkIfUserLikesRecipe(randomRecipe, fetchedRecipes);
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
      return response;
    } catch (error) {
      setMessage("Error fetching saved recipes: " + error.message);
      return [];
    }
  };

  const fetchRandomRecipe = async () => {
    try {
      const response = await apiFetch("/recipes/random");
      console.log("Fetched random recipe:", response);
      setRecipe(response);
      return response;
    } catch (error) {
      setMessage("Error fetching recipe: " + error.message);
      return null;
    }
  };

  const checkIfUserLikesRecipe = (fetchedRecipe, savedRecipes) => {
    if (!fetchedRecipe || !savedRecipes) return;
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
      const fetchedRecipes = await fetchUserSavedRecipes(); // Refresh saved recipes after adding
      const newRecipe = await fetchRandomRecipe();
      checkIfUserLikesRecipe(newRecipe, fetchedRecipes);
    } catch (error) {
      setMessage("Error adding recipe: " + error.message);
    }
  };

  const handlePass = async () => {
    setMessage(""); // Clear message before fetching a new recipe
    const newRecipe = await fetchRandomRecipe();
    checkIfUserLikesRecipe(newRecipe, savedRecipes);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="flex flex-col items-center space-y-6 bg-stone-500 p-10 rounded-lg shadow-lg max-w-lg">
        {recipe ? (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-3xl font-bold text-black">{recipe.name}</h3>
            <p className="text-lg text-black">{recipe.cuisine}</p>
            <p className="text-lg text-black">
              {recipe.ingredients.join(", ")}
            </p>
            <p className="text-lg text-black">
              Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
            </p>
          </div>
        ) : (
          <p className="text-lg text-black">Loading...</p>
        )}
        <div className="flex justify-between w-full mt-6">
          <button
            onClick={handleMakeIt}
            className="bg-amber-500 text-slate-950 hover:bg-amber-400 px-6 py-3 rounded text-xl"
          >
            Make It
          </button>
          <button
            onClick={handlePass}
            className="bg-red-500 text-slate-950 hover:bg-red-400 px-6 py-3 rounded text-xl"
          >
            Pass
          </button>
        </div>
        {message && <p className="mt-6 text-lg text-black">{message}</p>}
      </div>
    </div>
  );
};

export default Matching;
