import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../api/fetch";

const MatchedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMatchedRecipes();
  }, []);

  const fetchMatchedRecipes = async () => {
    try {
      const response = await apiFetch("/users/matched-recipes");
      setRecipes(response);
    } catch (error) {
      setMessage("Error fetching matched recipes: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Matched Recipes</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <div className="grid grid-cols-1 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card p-4">
            <h3 className="card-title">{recipe.name}</h3>
            <p>{recipe.cuisine}</p>
            <p>{recipe.ingredients.join(", ")}</p>
            <p>
              Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
            </p>
            <Link
              to={`/recipe/${recipe._id}`}
              state={{ from: "matchedrecipes" }}
            >
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400">
                View Recipe
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchedRecipes;
