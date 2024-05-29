import React, { useState, useEffect } from 'react';
import apiFetch from '../api/fetch';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await apiFetch('/recipes', {
          method: 'GET',
        });
        setRecipes(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.name} by {recipe.creator.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
