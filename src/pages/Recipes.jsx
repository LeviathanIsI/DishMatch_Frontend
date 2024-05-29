import React, { useState, useEffect } from 'react';
import apiFetch from '../api/fetch';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await apiFetch('/recipes');
      setRecipes(response);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id} className="card p-4 mb-4">
            <h3 className="card-title">{recipe.name}</h3>
            <p>{recipe.cuisine}</p>
            <p>{recipe.ingredients.join(', ')}</p>
            <p>Created by: {recipe.creator ? recipe.creator.username : 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
