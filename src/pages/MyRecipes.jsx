import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiFetch from "../api/fetch";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await apiFetch("/recipes/my-recipes");
      setRecipes(response);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">My Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} className="card p-4 mb-4">
            <h3 className="card-title">{recipe.name}</h3>
            <p>{recipe.cuisine}</p>
            <p>{recipe.ingredients.join(", ")}</p>
            <p>
              Created by: {recipe.creator ? recipe.creator.username : "Unknown"}
            </p>
            <Link to={`/recipe/${recipe._id}`} state={{ from: "myrecipes" }}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-400">
                View Recipe
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
