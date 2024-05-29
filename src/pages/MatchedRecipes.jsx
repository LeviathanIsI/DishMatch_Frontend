import React, { useState, useEffect } from 'react';
import apiFetch from '../api/fetch';

const MatchedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMatchedRecipes();
  }, []);

  const fetchMatchedRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiFetch('/users/matched-recipes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRecipes(response);
    } catch (error) {
      setMessage('Error fetching matched recipes: ' + error.message);
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
            <p>{recipe.ingredients.join(', ')}</p>
            <p>Created by: {recipe.creator ? recipe.creator.username : 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchedRecipes;
