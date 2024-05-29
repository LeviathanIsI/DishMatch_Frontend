import React, { useState, useEffect } from 'react';
import apiFetch from '../api/fetch';

const Matching = () => {
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const fetchRandomRecipe = async () => {
    try {
      const response = await apiFetch('/recipes/random');
      setRecipe(response);
    } catch (error) {
      setMessage('Error fetching recipe: ' + error.message);
    }
  };

  const handleMakeIt = async () => {
    try {
      const token = localStorage.getItem('token');
      await apiFetch('/recipes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ recipeId: recipe._id }),
      });
      setMessage('Recipe added to your saved recipes!');
      fetchRandomRecipe();
    } catch (error) {
      setMessage('Error adding recipe: ' + error.message);
    }
  };

  const handlePass = () => {
    fetchRandomRecipe();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Matching Screen</h2>
      {recipe ? (
        <div className="card p-4 mb-4">
          <h3 className="card-title">{recipe.name}</h3>
          <p>{recipe.cuisine}</p>
          <p>{recipe.ingredients.join(', ')}</p>
          <p>Created by: {recipe.creator ? recipe.creator.username : 'Unknown'}</p>
          <button onClick={handleMakeIt} className="btn mt-4">Make It</button>
          <button onClick={handlePass} className="btn mt-4 ml-4">Pass</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Matching;
