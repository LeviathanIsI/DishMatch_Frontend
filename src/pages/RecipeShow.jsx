import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import apiFetch from "../api/fetch";

const RecipeShow = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await apiFetch(`/recipes/${id}`);
        setRecipe(response);
      } catch (error) {
        setMessage("Error fetching recipe: " + error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleBackClick = () => {
    if (location.state?.from === "myrecipes") {
      navigate("/myrecipes");
    } else if (location.state?.from === "matchedrecipes") {
      navigate("/matched-recipes");
    } else {
      navigate(-1); // Go back to previous page if state is not available
    }
  };

  if (!recipe) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-400"
      >
        Back
      </button>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl mb-4 text-white">{recipe.name}</h2>
        <p className="text-lg text-white">{recipe.cuisine}</p>
        <p className="text-lg text-white">{recipe.ingredients.join(", ")}</p>
        <p className="text-lg text-white">{recipe.description}</p>
        <p className="text-lg text-white">Time to make: {recipe.timeToMake}</p>
        <p className="text-lg text-white">
          Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
        </p>
      </div>
      {message && <p className="mt-4 text-white">{message}</p>}
    </div>
  );
};

export default RecipeShow;
